# Scrumban Board & Backlog Viewer (Extensión para VS Code)

Extensión de Visual Studio Code deseñada para visualizar de forma interactiva proxectos que seguen a metodoloxía **Scrumban + AI-Driven Development** baseada nos ficheiros Markdown:

- `BOARD.md` (Taboleiro operativo do ciclo actual)
- `BACKLOG.md` (Product Backlog: tarefas `Ready`, melloras candidatas MoSCoW e histórico `Done`)
- `tasks/*.md` (Fichas individuais de cada tarefa)

---

## Características principais

1. **Detección automática:** Actívase automaticamente ao abrir calquera proxecto ou subcarpeta (por exemplo, na raíz ou dentro de `tfg/`) que conteña `BOARD.md` ou `BACKLOG.md`.
2. **Vista superior — Taboleiro Kanban (`BOARD.md` + `Done`):**
   - Mostra en columnas as tarefas **Seleccionadas para o ciclo**, **En progreso (WIP)**, **Pendentes de revisión e defensa (`In Review`)** e **Validadas en `Done`**.
   - Cada tarxeta mostra o seu **ID** (`T1`, `T2`...), **Título**, **Prioridade** (*Must have*, *Should have*, *Could have*), **Etiquetas** con cores (`learning`, `feature`, `workflow`, `testing`, `refactoring`, `ai-evaluation`, `documentation`), **Horas estimadas vs. reais** e unha **barra de progreso** calculada automaticamente a partir dos checkboxes (`- [x]`) da súa ficha.
3. **Extracción da descrición e apertura do visor Markdown:**
   - Le automaticamente a sección `## 1. Descrición` de cada ficheiro `tasks/tarefa-XX-...md` e móstraa na tarxeta.
   - Inclúe o botón **`📖 Abrir Visor MD`** que abre directamente a ficha da tarefa no **visor de previsualización de Markdown de VS Code** (`markdown.showPreviewToSide`), e o botón **`✏️ Editar Ficha`** para abrir o ficheiro fonte.
4. **Vista inferior — Visor de `BACKLOG.md`:**
   - Mostra debaixo do taboleiro todas as **Tarefas `Ready`** planificadas en `BACKLOG.md` (indicando cales están xa activas no ciclo actual) e os bloques de **Melloras Candidatas (MoSCoW)** para ter sempre á vista que máis traballo hai planificado ou pendente.
5. **Actualización en tempo real (*Live Reload*):**
   - Calquera cambio gardado en `BOARD.md`, `BACKLOG.md` ou `tasks/*.md` (feito manualmente ou por un axente de IA) actualiza o taboleiro ao instante.

---

## Instalación en VS Code

A extensión está escrita en JavaScript nativo para o motor de Node.js integrado en VS Code, polo que **non require instalar dependencias externas (`node_modules`) nin compilar TypeScript**.

### Paso 1: Xerar o paquete `.vsix`
Non necesitas `npm` nin `@vscode/vsce`. Executa o script incluído con Python 3 estándar para xerar o ficheiro `scrumban-board-viewer-0.1.0.vsix`:

```bash
cd plugins/vscode-scrumban
python3 build-vsix.py
```

### Paso 2 (Opción A): Instalar desde a interface gráfica de VS Code
1. Abre VS Code.
2. Vai á vista de **Extensions** (`Ctrl+Shift+X`).
3. Preme na icona de tres puntos `...` (arriba á dereita do panel de extensións) → **Install from VSIX...**.
4. Selecciona o ficheiro xerado:
   ```text
   plugins/vscode-scrumban/scrumban-board-viewer-0.1.0.vsix
   ```

### Paso 2 (Opción B): Instalar desde a terminal
```bash
code --install-extension plugins/vscode-scrumban/scrumban-board-viewer-0.1.0.vsix
```

---

## Como probar a extensión en modo desenvolvemento

Se modificas o código do plugin, podes rexenerar o `.vsix` con `python3 build-vsix.py` (ou `npx @vscode/vsce package`), ou probalo directamente sen instalar:
1. Abre a carpeta `plugins/vscode-scrumban` en VS Code.
2. Preme **`F5`** para lanzar unha xanela *Extension Development Host*.

---

## Como abrir o visor dentro dun proxecto

Unha vez instalada a extensión, cando abras un proxecto con `BOARD.md` ou `BACKLOG.md` podes abrir o taboleiro de tres xeitos:
1. **Barra de estado inferior (Status Bar):** Preme no botón **`$(project) Scrumban Board`** abaixo á esquerda.
2. **Barra superior do editor:** Ao abrir `BOARD.md`, `BACKLOG.md` ou `SCRUMBAN.md`, preme na icona de taboleiro arriba á dereita do editor.
3. **Paleta de comandos (`Ctrl+Shift+P`):** Executa **`Scrumban: Open Board & Backlog Viewer`**.
