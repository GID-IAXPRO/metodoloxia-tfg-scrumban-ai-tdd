function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getPriorityBadgeClass(priority) {
  const p = (priority || '').toLowerCase();
  if (p.includes('must')) return 'badge-must';
  if (p.includes('should')) return 'badge-should';
  if (p.includes('could')) return 'badge-could';
  return 'badge-default';
}

function getTagColorClass(tag) {
  const t = (tag || '').toLowerCase();
  if (t.includes('feature')) return 'tag-feature';
  if (t.includes('workflow')) return 'tag-workflow';
  if (t.includes('testing')) return 'tag-testing';
  if (t.includes('refactoring')) return 'tag-refactoring';
  if (t.includes('learning')) return 'tag-learning';
  if (t.includes('ai-evaluation')) return 'tag-ai';
  if (t.includes('documentation')) return 'tag-doc';
  return 'tag-default';
}

function renderCard(card, options = {}) {
  const prioBadge = card.priority
    ? `<span class="badge ${getPriorityBadgeClass(card.priority)}">${escapeHtml(card.priority)}</span>`
    : '';

  const inBoardBadge = options.showInBoardBadge && card.inBoard
    ? `<span class="badge badge-active">No Ciclo (BOARD)</span>`
    : '';

  const tagsHtml = (card.tags || [])
    .map(t => `<span class="tag ${getTagColorClass(t)}">${escapeHtml(t)}</span>`)
    .join('');

  const desc = card.taskDetails && card.taskDetails.description
    ? `<p class="card-desc">${escapeHtml(card.taskDetails.description)}</p>`
    : `<p class="card-desc card-desc-empty">Sen descrición detallada na ficha.</p>`;

  let progressHtml = '';
  if (card.taskDetails && card.taskDetails.objectivesTotal > 0) {
    const done = card.taskDetails.objectivesDone;
    const total = card.taskDetails.objectivesTotal;
    const pct = Math.round((done / total) * 100);
    progressHtml = `
      <div class="progress-wrap" title="Subtarefas / Obxectivos completados na ficha">
        <div class="progress-bar"><div class="progress-fill" style="width: ${pct}%"></div></div>
        <span class="progress-label">☑ ${done}/${total} (${pct}%)</span>
      </div>
    `;
  }

  const metaItems = [];
  if (card.hoursEst) metaItems.push(`<span title="Horas estimadas">⏱ Est: <strong>${escapeHtml(card.hoursEst)}</strong></span>`);
  if (card.hoursReal) metaItems.push(`<span title="Horas reais">⌛ Real: <strong>${escapeHtml(card.hoursReal)}</strong></span>`);
  if (card.phase) metaItems.push(`<span title="Fase actual">🔄 Fase: <strong>${escapeHtml(card.phase)}</strong></span>`);
  if (card.startDate) metaItems.push(`<span>📅 Inicio: ${escapeHtml(card.startDate)}</span>`);
  if (card.closeDate) metaItems.push(`<span>✅ Peche: ${escapeHtml(card.closeDate)}</span>`);
  if (card.aiSheet) metaItems.push(`<span>🤖 Ficha IA: ${escapeHtml(card.aiSheet)}</span>`);

  const actionsHtml = card.taskDetails && card.taskDetails.fullPath
    ? `
      <div class="card-actions">
        <button class="btn btn-primary" onclick="openPreview('${escapeHtml(card.taskDetails.fullPath.replace(/\\/g, '\\\\'))}')">
          📖 Abrir Visor MD
        </button>
        <button class="btn btn-secondary" onclick="openSource('${escapeHtml(card.taskDetails.fullPath.replace(/\\/g, '\\\\'))}')">
          ✏️ Editar Ficha
        </button>
      </div>
    `
    : '';

  return `
    <article class="card ${card.inBoard && options.showInBoardBadge ? 'card-in-board' : ''}">
      <div class="card-header">
        <span class="card-id">${escapeHtml(card.id || 'T?')}</span>
        <div class="card-badges">
          ${inBoardBadge}
          ${prioBadge}
        </div>
      </div>
      <h4 class="card-title">${escapeHtml(card.title)}</h4>
      ${tagsHtml ? `<div class="card-tags">${tagsHtml}</div>` : ''}
      ${desc}
      ${progressHtml}
      ${metaItems.length > 0 ? `<div class="card-meta">${metaItems.join('')}</div>` : ''}
      ${actionsHtml}
    </article>
  `;
}

function buildWebviewHtml(projects, activeProjectIndex = 0) {
  const project = projects[activeProjectIndex] || {
    baseDir: '',
    boardColumns: [],
    backlogReady: [],
    backlogCandidates: [],
    backlogDone: []
  };

  const projectSelectorHtml = projects.length > 1
    ? `
      <div class="project-selector">
        <label for="projectSelect">Carpeta Scrumban:</label>
        <select id="projectSelect" onchange="selectProject(this.value)">
          ${projects.map((p, idx) => `
            <option value="${idx}" ${idx === activeProjectIndex ? 'selected' : ''}>
              ${escapeHtml(p.label)}
            </option>
          `).join('')}
        </select>
      </div>
    `
    : '';

  // Render BOARD columns + Done column if BACKLOG has Done tasks
  const columns = [...project.boardColumns];
  if (project.backlogDone && project.backlogDone.length > 0) {
    columns.push({
      title: '4. Validadas en Done (BACKLOG)',
      cards: project.backlogDone
    });
  }

  const columnsHtml = columns.map(col => {
    const cardsHtml = col.cards.length > 0
      ? col.cards.map(c => renderCard(c)).join('')
      : `<div class="empty-col">Sen tarefas neste estado</div>`;

    return `
      <section class="board-col">
        <header class="col-header">
          <h3>${escapeHtml(col.title)}</h3>
          <span class="col-count">${col.cards.length}</span>
        </header>
        <div class="col-body">
          ${cardsHtml}
        </div>
      </section>
    `;
  }).join('');

  // Render Backlog Ready cards
  const readyCardsHtml = project.backlogReady.length > 0
    ? `<div class="ready-grid">${project.backlogReady.map(c => renderCard(c, { showInBoardBadge: true })).join('')}</div>`
    : `<div class="empty-col">Non hai tarefas na táboa Ready de BACKLOG.md</div>`;

  // Render Product Backlog Candidate groups (MoSCoW)
  const candidatesHtml = project.backlogCandidates.length > 0
    ? `<div class="candidates-grid">
        ${project.backlogCandidates.map(group => `
          <div class="candidate-group">
            <h4 class="candidate-group-title">${escapeHtml(group.title)}</h4>
            <ul class="candidate-list">
              ${group.items.map(item => `
                <li class="candidate-item ${item.done ? 'candidate-done' : ''}">
                  <span class="candidate-check">${item.done ? '☑️' : '⬜'}</span>
                  <div class="candidate-content">
                    <div class="candidate-top">
                      <strong>${escapeHtml(item.title)}</strong>
                      ${item.hoursEst ? `<span class="candidate-est">⏱ ${escapeHtml(item.hoursEst)}</span>` : ''}
                    </div>
                    ${item.extra ? `<p class="candidate-extra">${escapeHtml(item.extra)}</p>` : ''}
                    ${item.tags && item.tags.length > 0
                      ? `<div class="card-tags">${item.tags.map(t => `<span class="tag ${getTagColorClass(t)}">${escapeHtml(t)}</span>`).join('')}</div>`
                      : ''}
                  </div>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>`
    : `<div class="empty-col">Non hai melloras candidatas definidas en BACKLOG.md</div>`;

  const boardFileBtn = project.boardPath
    ? `<button class="btn btn-secondary" onclick="openPreview('${escapeHtml(project.boardPath.replace(/\\/g, '\\\\'))}')">📋 Ver BOARD.md</button>
       <button class="btn btn-secondary" onclick="openSource('${escapeHtml(project.boardPath.replace(/\\/g, '\\\\'))}')">✏️ Editar BOARD.md</button>`
    : '';

  const backlogFileBtn = project.backlogPath
    ? `<button class="btn btn-secondary" onclick="openPreview('${escapeHtml(project.backlogPath.replace(/\\/g, '\\\\'))}')">🗂️ Ver BACKLOG.md</button>
       <button class="btn btn-secondary" onclick="openSource('${escapeHtml(project.backlogPath.replace(/\\/g, '\\\\'))}')">✏️ Editar BACKLOG.md</button>`
    : '';

  return `<!DOCTYPE html>
<html lang="gl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scrumban Board & Backlog</title>
  <style>
    :root {
      --bg-surface: var(--vscode-editorWidget-background, rgba(128, 128, 128, 0.08));
      --bg-card: var(--vscode-editor-background);
      --border-color: var(--vscode-widget-border, rgba(128, 128, 128, 0.25));
      --text-main: var(--vscode-editor-foreground);
      --text-muted: var(--vscode-descriptionForeground);
      --accent: var(--vscode-textLink-foreground, #3794ff);
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      color: var(--text-main);
      background-color: var(--vscode-editor-background);
      margin: 0;
      padding: 20px;
      line-height: 1.45;
    }

    /* Top Header */
    .top-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding-bottom: 16px;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--border-color);
    }

    .top-title h1 {
      margin: 0;
      font-size: 1.45rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .top-stats {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-top: 6px;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .stat-pill {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      padding: 3px 10px;
      border-radius: 999px;
    }

    .top-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }

    .project-selector select {
      background: var(--vscode-dropdown-background);
      color: var(--vscode-dropdown-foreground);
      border: 1px solid var(--vscode-dropdown-border, var(--border-color));
      padding: 5px 8px;
      border-radius: 4px;
    }

    /* Section Headings */
    .section-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 24px 0 12px 0;
      padding-bottom: 6px;
      border-bottom: 2px solid var(--border-color);
    }

    .section-title h2 {
      margin: 0;
      font-size: 1.15rem;
    }

    .section-subtitle {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    /* Board Columns Grid */
    .board-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
      gap: 16px;
      align-items: start;
    }

    .board-col {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 12px;
      min-height: 220px;
    }

    .col-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-color);
    }

    .col-header h3 {
      margin: 0;
      font-size: 0.96rem;
      font-weight: 600;
    }

    .col-count {
      background: var(--vscode-badge-background);
      color: var(--vscode-badge-foreground);
      font-size: 0.78rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 999px;
    }

    .col-body {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .empty-col {
      padding: 24px 12px;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
      font-style: italic;
      border: 1px dashed var(--border-color);
      border-radius: 6px;
    }

    /* Task Cards */
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 7px;
      padding: 13px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
      transition: transform 0.12s ease, border-color 0.12s ease;
    }

    .card:hover {
      border-color: var(--accent);
    }

    .card-in-board {
      border-left: 4px solid var(--accent);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }

    .card-id {
      font-family: var(--vscode-editor-font-family, monospace);
      font-weight: 700;
      font-size: 0.85rem;
      padding: 2px 7px;
      border-radius: 4px;
      background: rgba(128, 128, 128, 0.18);
    }

    .card-badges {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .badge {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .badge-must {
      background: rgba(229, 83, 75, 0.2);
      color: #ff7b72;
      border: 1px solid rgba(229, 83, 75, 0.45);
    }

    .badge-should {
      background: rgba(210, 153, 34, 0.2);
      color: #e3b341;
      border: 1px solid rgba(210, 153, 34, 0.45);
    }

    .badge-could {
      background: rgba(56, 139, 253, 0.2);
      color: #79c0ff;
      border: 1px solid rgba(56, 139, 253, 0.45);
    }

    .badge-active {
      background: rgba(46, 160, 67, 0.22);
      color: #56d364;
      border: 1px solid rgba(46, 160, 67, 0.45);
    }

    .card-title {
      margin: 6px 0 8px 0;
      font-size: 0.98rem;
      line-height: 1.35;
    }

    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 9px;
    }

    .tag {
      font-size: 0.73rem;
      padding: 1px 7px;
      border-radius: 4px;
      font-family: var(--vscode-editor-font-family, monospace);
      background: rgba(128, 128, 128, 0.15);
      border: 1px solid rgba(128, 128, 128, 0.28);
    }

    .tag-feature { color: #79c0ff; border-color: rgba(121, 192, 255, 0.35); }
    .tag-workflow { color: #d2a8ff; border-color: rgba(210, 168, 255, 0.35); }
    .tag-testing { color: #56d364; border-color: rgba(86, 211, 100, 0.35); }
    .tag-refactoring { color: #ffa657; border-color: rgba(255, 166, 87, 0.35); }
    .tag-learning { color: #a5d6ff; border-color: rgba(165, 214, 255, 0.35); }
    .tag-ai { color: #ff7b72; border-color: rgba(255, 123, 114, 0.35); }
    .tag-doc { color: #e3b341; border-color: rgba(227, 179, 65, 0.35); }

    .card-desc {
      margin: 0 0 10px 0;
      font-size: 0.84rem;
      color: var(--text-muted);
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-desc-empty {
      font-style: italic;
      opacity: 0.75;
    }

    /* Objectives Progress Bar */
    .progress-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }

    .progress-bar {
      flex: 1;
      height: 6px;
      background: rgba(128, 128, 128, 0.22);
      border-radius: 999px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--accent);
    }

    .progress-label {
      font-size: 0.74rem;
      color: var(--text-muted);
      white-space: nowrap;
    }

    .card-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      font-size: 0.78rem;
      color: var(--text-muted);
      padding-top: 8px;
      border-top: 1px solid var(--border-color);
      margin-bottom: 10px;
    }

    .card-actions {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    /* Buttons */
    .btn {
      cursor: pointer;
      font-size: 0.78rem;
      padding: 5px 10px;
      border-radius: 4px;
      border: 1px solid transparent;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .btn-primary {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
    }

    .btn-primary:hover {
      background: var(--vscode-button-hoverBackground);
    }

    .btn-secondary {
      background: var(--vscode-button-secondaryBackground, rgba(128, 128, 128, 0.18));
      color: var(--vscode-button-secondaryForeground, var(--text-main));
      border-color: var(--border-color);
    }

    .btn-secondary:hover {
      background: var(--vscode-button-secondaryHoverBackground, rgba(128, 128, 128, 0.28));
    }

    /* Lower Backlog Sections */
    .ready-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 14px;
    }

    .candidates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
      margin-top: 12px;
    }

    .candidate-group {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 14px;
    }

    .candidate-group-title {
      margin: 0 0 10px 0;
      font-size: 0.95rem;
      padding-bottom: 6px;
      border-bottom: 1px solid var(--border-color);
    }

    .candidate-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .candidate-item {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 10px;
      font-size: 0.85rem;
    }

    .candidate-done {
      opacity: 0.65;
      text-decoration: line-through;
    }

    .candidate-content {
      flex: 1;
    }

    .candidate-top {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 4px;
    }

    .candidate-est {
      font-size: 0.76rem;
      color: var(--text-muted);
      white-space: nowrap;
    }

    .candidate-extra {
      margin: 0 0 6px 0;
      font-size: 0.8rem;
      color: var(--text-muted);
    }
  </style>
</head>
<body>
  <header class="top-bar">
    <div class="top-title">
      <h1>📊 Taboleiro Scrumban & Product Backlog</h1>
      <div class="top-stats">
        ${project.budgetSummary ? `<span class="stat-pill">🎯 Orzamento: <strong>${escapeHtml(project.budgetSummary)}</strong></span>` : ''}
        ${project.doneHoursSummary ? `<span class="stat-pill">✅ Horas en Done: <strong>${escapeHtml(project.doneHoursSummary)}</strong></span>` : ''}
        ${project.wipLimit ? `<span class="stat-pill">🚦 WIP: <strong>${escapeHtml(project.wipLimit)}</strong></span>` : ''}
      </div>
    </div>
    <div class="top-actions">
      ${projectSelectorHtml}
      ${boardFileBtn}
      ${backlogFileBtn}
      <button class="btn btn-primary" onclick="refreshBoard()">🔄 Actualizar</button>
    </div>
  </header>

  <!-- 1. TABOLEIRO OPERATIVO DO CICLO (BOARD.md) -->
  <div class="section-title">
    <h2>1. Taboleiro Operativo do Ciclo (BOARD.md)</h2>
    <span class="section-subtitle">Fluxo activo do estudante no ciclo de 10–15 días</span>
  </div>
  <main class="board-grid">
    ${columnsHtml}
  </main>

  <!-- 2. BACKLOG DE PRODUTO: TAREFAS READY (BACKLOG.md) -->
  <div class="section-title">
    <h2>2. Tarefas Planificadas en BACKLOG.md (Ready)</h2>
    <span class="section-subtitle">Tarefas definidas con ficha en tasks/ listas para entrar en vindeiros ciclos</span>
  </div>
  <section>
    ${readyCardsHtml}
  </section>

  <!-- 3. BACKLOG DE MELLORAS CANDIDATAS (MoSCoW) -->
  <div class="section-title">
    <h2>3. Backlog de Melloras Candidatas (Product Backlog MoSCoW)</h2>
    <span class="section-subtitle">Funcionalidades e obxectivos candidatos pendentes de activar segundo o avance</span>
  </div>
  <section>
    ${candidatesHtml}
  </section>

  <script>
    const vscode = acquireVsCodeApi();

    function openPreview(filePath) {
      vscode.postMessage({ command: 'openPreview', filePath });
    }

    function openSource(filePath) {
      vscode.postMessage({ command: 'openSource', filePath });
    }

    function refreshBoard() {
      vscode.postMessage({ command: 'refresh' });
    }

    function selectProject(index) {
      vscode.postMessage({ command: 'selectProject', index: Number(index) });
    }
  </script>
</body>
</html>`;
}

module.exports = {
  buildWebviewHtml
};
