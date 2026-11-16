const vscode = require('vscode');
const path = require('path');
const { parseScrumbanProject } = require('./parser');
const { buildWebviewHtml } = require('./webview');

let currentPanel = null;
let activeProjectIndex = 0;
let statusBarItem = null;

/**
 * Find all directories in the workspace that contain BOARD.md or BACKLOG.md
 */
async function findScrumbanDirectories() {
  const uris = await vscode.workspace.findFiles(
    '**/{BOARD,BACKLOG}.md',
    '**/node_modules/**',
    50
  );

  const dirSet = new Set();
  for (const uri of uris) {
    dirSet.add(path.dirname(uri.fsPath));
  }

  const workspaceFolders = vscode.workspace.workspaceFolders || [];
  const rootPath = workspaceFolders.length > 0 ? workspaceFolders[0].uri.fsPath : '';

  return Array.from(dirSet)
    .sort()
    .map(dir => {
      const rel = rootPath ? path.relative(rootPath, dir) : dir;
      return {
        baseDir: dir,
        label: rel ? rel : path.basename(dir) + ' (raíz)'
      };
    });
}

/**
 * Render or update the Webview panel content
 */
async function updateWebviewContent() {
  if (!currentPanel) return;

  const dirs = await findScrumbanDirectories();
  if (dirs.length === 0) {
    currentPanel.webview.html = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: sans-serif; padding: 24px;">
        <h2>Non se atoparon ficheiros BOARD.md nin BACKLOG.md neste espazo de traballo.</h2>
      </body>
      </html>
    `;
    return;
  }

  if (activeProjectIndex >= dirs.length) {
    activeProjectIndex = 0;
  }

  const projects = dirs.map(d => ({
    ...parseScrumbanProject(d.baseDir),
    label: d.label
  }));

  currentPanel.webview.html = buildWebviewHtml(projects, activeProjectIndex);
}

/**
 * Open or focus the Scrumban Board Webview Panel
 */
async function openScrumbanBoard(context, preferredUri) {
  const dirs = await findScrumbanDirectories();

  // If invoked from a specific BOARD.md or BACKLOG.md, select its directory automatically
  if (preferredUri && preferredUri.fsPath) {
    const targetDir = path.dirname(preferredUri.fsPath);
    const foundIdx = dirs.findIndex(d => d.baseDir === targetDir);
    if (foundIdx !== -1) {
      activeProjectIndex = foundIdx;
    }
  }

  if (currentPanel) {
    currentPanel.reveal(vscode.ViewColumn.One);
    await updateWebviewContent();
    return;
  }

  currentPanel = vscode.window.createWebviewPanel(
    'scrumbanBoardViewer',
    'Scrumban Board & Backlog',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true
    }
  );

  currentPanel.onDidDispose(
    () => {
      currentPanel = null;
    },
    null,
    context.subscriptions
  );

  currentPanel.webview.onDidReceiveMessage(
    async message => {
      switch (message.command) {
        case 'openPreview': {
          if (message.filePath) {
            const uri = vscode.Uri.file(message.filePath);
            await vscode.commands.executeCommand('markdown.showPreviewToSide', uri);
          }
          break;
        }
        case 'openSource': {
          if (message.filePath) {
            const uri = vscode.Uri.file(message.filePath);
            const doc = await vscode.workspace.openTextDocument(uri);
            await vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside);
          }
          break;
        }
        case 'refresh': {
          await updateWebviewContent();
          break;
        }
        case 'selectProject': {
          activeProjectIndex = Number(message.index) || 0;
          await updateWebviewContent();
          break;
        }
      }
    },
    undefined,
    context.subscriptions
  );

  await updateWebviewContent();
}

async function updateStatusBarVisibility() {
  if (!statusBarItem) return;
  const dirs = await findScrumbanDirectories();
  if (dirs.length > 0) {
    statusBarItem.show();
  } else {
    statusBarItem.hide();
  }
}

function activate(context) {
  // Register commands
  const openCmd = vscode.commands.registerCommand('scrumban.openBoard', uri => {
    openScrumbanBoard(context, uri);
  });

  const refreshCmd = vscode.commands.registerCommand('scrumban.refreshBoard', () => {
    updateWebviewContent();
  });

  // Status bar item for 1-click access
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBarItem.text = '$(project) Scrumban Board';
  statusBarItem.tooltip = 'Abrir o visor Scrumban (BOARD.md + BACKLOG.md)';
  statusBarItem.command = 'scrumban.openBoard';
  context.subscriptions.push(statusBarItem);

  updateStatusBarVisibility();

  // Watch BOARD.md, BACKLOG.md and tasks/*.md for live reload
  const watcher = vscode.workspace.createFileSystemWatcher('**/{BOARD,BACKLOG,tasks/*}.md');
  const onFileChange = () => {
    updateStatusBarVisibility();
    if (currentPanel) {
      updateWebviewContent();
    }
  };

  watcher.onDidChange(onFileChange, null, context.subscriptions);
  watcher.onDidCreate(onFileChange, null, context.subscriptions);
  watcher.onDidDelete(onFileChange, null, context.subscriptions);

  // Also refresh when a markdown document is edited & saved inside VS Code
  vscode.workspace.onDidSaveTextDocument(
    doc => {
      if (doc.fileName.endsWith('.md') && currentPanel) {
        updateWebviewContent();
      }
    },
    null,
    context.subscriptions
  );

  context.subscriptions.push(openCmd, refreshCmd, watcher);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
