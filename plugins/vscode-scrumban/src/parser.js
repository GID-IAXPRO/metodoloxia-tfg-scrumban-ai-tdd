const fs = require('fs');
const path = require('path');

/**
 * Remove markdown formatting like **, `, etc.
 */
function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .trim();
}

/**
 * Extract backtick-wrapped tags or comma-separated tags from a cell
 */
function parseTags(cell) {
  if (!cell || cell === '—' || cell === '-') return [];
  const matches = [...cell.matchAll(/`([^`]+)`/g)].map(m => m[1].trim());
  if (matches.length > 0) return matches;
  return cell
    .split(',')
    .map(s => cleanText(s))
    .filter(Boolean);
}

/**
 * Extract markdown link [label](target) from a cell
 */
function parseLink(cell) {
  if (!cell) return null;
  const match = cell.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (!match) return null;
  return {
    label: cleanText(match[1]),
    href: match[2].trim()
  };
}

/**
 * Read task file and extract description, objectives progress, and metadata
 */
function parseTaskFile(baseDir, relativeHref) {
  if (!relativeHref) return null;
  const fullPath = path.resolve(baseDir, relativeHref);
  if (!fs.existsSync(fullPath)) {
    return {
      fullPath,
      exists: false,
      description: '',
      objectivesTotal: 0,
      objectivesDone: 0
    };
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split(/\r?\n/);

    // Extract section "## 1. Descrición" or "## 1. Conto / Descrición"
    let inDesc = false;
    const descLines = [];
    for (const line of lines) {
      if (/^##\s+1\.\s+/i.test(line)) {
        inDesc = true;
        continue;
      }
      if (inDesc) {
        if (/^##\s+/.test(line)) break;
        // Skip blockquotes if we already have main text, or include them cleaned
        const trimmed = line.trim();
        if (trimmed.startsWith('>')) continue;
        if (trimmed.startsWith('###')) continue;
        if (trimmed) {
          descLines.push(cleanText(trimmed));
        }
      }
    }

    // Count checkboxes in section 2 (Obxectivos)
    const unchecked = (content.match(/^-\s*\[\s\]/gm) || []).length;
    const checked = (content.match(/^-\s*\[[xX]\]/gm) || []).length;

    // Extract metadata fallback from file if needed
    const prioMatch = content.match(/^-\s*\*\*Prioridade:\*\*\s*(.+)$/m);
    const tagsMatch = content.match(/^-\s*\*\*Etiquetas:\*\*\s*(.+)$/m);

    return {
      fullPath,
      exists: true,
      description: descLines.join(' ').slice(0, 360) + (descLines.join(' ').length > 360 ? '…' : ''),
      objectivesTotal: unchecked + checked,
      objectivesDone: checked,
      filePriority: prioMatch ? cleanText(prioMatch[1]) : '',
      fileTags: tagsMatch ? parseTags(tagsMatch[1]) : []
    };
  } catch (err) {
    return {
      fullPath,
      exists: false,
      description: '',
      objectivesTotal: 0,
      objectivesDone: 0
    };
  }
}

/**
 * Parse markdown tables inside a specific section
 */
function parseTableRows(sectionLines) {
  const tableLines = sectionLines
    .map(l => l.trim())
    .filter(l => l.startsWith('|') && l.endsWith('|'));

  if (tableLines.length < 2) return [];

  const headers = tableLines[0]
    .slice(1, -1)
    .split('|')
    .map(h => cleanText(h).toLowerCase());

  const rows = [];
  for (let i = 2; i < tableLines.length; i++) {
    const rawCells = tableLines[i]
      .slice(1, -1)
      .split('|')
      .map(c => c.trim());

    // Skip empty placeholder rows (| — | — | ...)
    const firstCell = cleanText(rawCells[0] || '');
    if (!firstCell || firstCell === '—' || firstCell === '-') continue;

    const rowObj = {};
    headers.forEach((h, idx) => {
      rowObj[h] = rawCells[idx] !== undefined ? rawCells[idx] : '';
    });
    rows.push({ headers, cells: rawCells, map: rowObj });
  }
  return rows;
}

/**
 * Normalize a parsed table row into a rich Card object
 */
function buildCardFromRow(row, baseDir) {
  const m = row.map;
  const id = cleanText(m['id'] || row.cells[0] || '');
  const title = cleanText(m['tarefa'] || row.cells[1] || '');

  // Find link column ('ficha' or last column with a link)
  let link = parseLink(m['ficha']);
  if (!link) {
    for (const cell of row.cells) {
      const candidate = parseLink(cell);
      if (candidate) {
        link = candidate;
        break;
      }
    }
  }

  const taskDetails = link ? parseTaskFile(baseDir, link.href) : null;

  let priority = cleanText(m['prioridade'] || '');
  if (!priority && taskDetails && taskDetails.filePriority) {
    priority = taskDetails.filePriority;
  }

  let tags = parseTags(m['etiquetas'] || '');
  if (tags.length === 0 && taskDetails && taskDetails.fileTags) {
    tags = taskDetails.fileTags;
  }

  const hoursEst = cleanText(m['horas est.'] || m['horas estimadas'] || '');
  const hoursReal = cleanText(
    m['horas reais'] || m['horas acumuladas'] || ''
  );

  // Additional contextual fields depending on table
  const phase = cleanText(
    m['fase actual (análise / deseño / impl. / tests)'] || m['fase actual'] || ''
  );
  const startDate = cleanText(m['data inicio'] || '');
  const closeDate = cleanText(m['data validación'] || m['data peche'] || '');
  const aiSheet = cleanText(m['ficha ia cuberta'] || '');
  const deliverables = cleanText(m['tests / entregables listos'] || '');

  return {
    id,
    title,
    priority,
    tags,
    hoursEst: hoursEst !== '—' ? hoursEst : '',
    hoursReal: hoursReal !== '—' ? hoursReal : '',
    phase: phase !== '—' ? phase : '',
    startDate: startDate !== '—' ? startDate : '',
    closeDate: closeDate !== '—' ? closeDate : '',
    aiSheet: aiSheet !== '—' ? aiSheet : '',
    deliverables: deliverables !== '—' ? deliverables : '',
    link,
    taskDetails
  };
}

/**
 * Split a markdown document by ## level-2 headings
 */
function splitSectionsByH2(content) {
  const lines = content.split(/\r?\n/);
  const sections = [];
  let current = null;

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      if (current) sections.push(current);
      current = { title: cleanText(match[1]), rawTitle: match[1], lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) sections.push(current);
  return sections;
}

/**
 * Parse candidate bullet items inside Product Backlog section (grouped by ### Must/Should/Could)
 */
function parseCandidateGroups(lines) {
  const groups = [];
  let currentGroup = { title: 'Xeral', items: [] };

  for (const line of lines) {
    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      if (currentGroup.items.length > 0) groups.push(currentGroup);
      currentGroup = { title: cleanText(h3[1]), items: [] };
      continue;
    }

    const itemMatch = line.match(/^-\s*\[([ xX])\]\s+(.+)$/);
    if (itemMatch) {
      const done = itemMatch[1].toLowerCase() === 'x';
      const rawText = itemMatch[2];
      const tags = parseTags(rawText);

      // Extract bold title if available
      const boldMatch = rawText.match(/\*\*(.+?)\*\*/);
      const title = boldMatch ? cleanText(boldMatch[1]) : cleanText(rawText);

      // Extract estimate if available (e.g., Est.: 25 h)
      const estMatch = rawText.match(/Est\.?:\s*([0-9]+\s*h)/i);
      const hoursEst = estMatch ? estMatch[1] : '';

      // Remaining description after removing bold title and parenthetical tags
      let extra = rawText
        .replace(/\*\*(.+?)\*\*/, '')
        .replace(/\((`[^)]+`)\)/g, '')
        .replace(/^[—\-\s.]+/, '')
        .trim();
      extra = cleanText(extra);

      currentGroup.items.push({
        done,
        title,
        tags,
        hoursEst,
        extra
      });
    }
  }
  if (currentGroup.items.length > 0) groups.push(currentGroup);
  return groups;
}

/**
 * Parse both BOARD.md and BACKLOG.md in a given directory
 */
function parseScrumbanProject(baseDir) {
  const boardPath = path.join(baseDir, 'BOARD.md');
  const backlogPath = path.join(baseDir, 'BACKLOG.md');

  const result = {
    baseDir,
    boardPath: fs.existsSync(boardPath) ? boardPath : null,
    backlogPath: fs.existsSync(backlogPath) ? backlogPath : null,
    budgetSummary: '',
    doneHoursSummary: '',
    wipLimit: '',
    boardColumns: [],
    backlogReady: [],
    backlogCandidates: [],
    backlogDone: []
  };

  // 1. Parse BOARD.md
  if (result.boardPath) {
    const boardContent = fs.readFileSync(result.boardPath, 'utf8');
    const wipMatch = boardContent.match(/\*\*Límite WIP[^*]*\*\*:\s*(.+)$/m);
    if (wipMatch) result.wipLimit = cleanText(wipMatch[1]);

    const boardSections = splitSectionsByH2(boardContent);
    for (const sec of boardSections) {
      const lower = sec.title.toLowerCase();
      // If BOARD.md has an embedded backlog section (older format), skip as column and parse as candidates
      if (lower.includes('backlog')) {
        if (result.backlogCandidates.length === 0) {
          result.backlogCandidates = parseCandidateGroups(sec.lines);
        }
        continue;
      }

      const rows = parseTableRows(sec.lines);
      const cards = rows.map(r => buildCardFromRow(r, baseDir));
      result.boardColumns.push({
        title: sec.title,
        cards
      });
    }
  }

  // 2. Parse BACKLOG.md
  if (result.backlogPath) {
    const backlogContent = fs.readFileSync(result.backlogPath, 'utf8');
    const budgetMatch = backlogContent.match(/\*\*Orzamento total[^*]*\*\*:\s*(.+)$/m);
    const doneHoursMatch = backlogContent.match(/\*\*Horas (?:validadas|completadas)[^*]*\*\*:\s*(.+)$/m);
    if (budgetMatch) result.budgetSummary = cleanText(budgetMatch[1]);
    if (doneHoursMatch) result.doneHoursSummary = cleanText(doneHoursMatch[1]);

    const backlogSections = splitSectionsByH2(backlogContent);
    for (const sec of backlogSections) {
      const lower = sec.title.toLowerCase();
      if (lower.includes('ready') || lower.includes('planificadas')) {
        const rows = parseTableRows(sec.lines);
        result.backlogReady = rows.map(r => buildCardFromRow(r, baseDir));
      } else if (lower.includes('done') || lower.includes('completadas') || lower.includes('histórico')) {
        const rows = parseTableRows(sec.lines);
        result.backlogDone = rows.map(r => buildCardFromRow(r, baseDir));
      } else if (lower.includes('backlog') || lower.includes('candidatas')) {
        result.backlogCandidates = parseCandidateGroups(sec.lines);
      }
    }
  }

  // Mark which Ready tasks in BACKLOG.md are already active in BOARD.md
  const activeIds = new Set();
  for (const col of result.boardColumns) {
    for (const c of col.cards) {
      if (c.id) activeIds.add(c.id);
    }
  }
  result.backlogReady = result.backlogReady.map(c => ({
    ...c,
    inBoard: activeIds.has(c.id)
  }));

  return result;
}

module.exports = {
  parseScrumbanProject
};
