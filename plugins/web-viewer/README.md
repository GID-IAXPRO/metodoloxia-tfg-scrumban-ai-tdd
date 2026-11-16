# Scrumban Board & Backlog — Visor Web Independente

Visor web autónomo (*standalone*, nun único ficheiro `index.html` sen dependencias externas) que mostra exactamente a mesma información ca o plugin de VS Code a partir de `BOARD.md`, `BACKLOG.md` e a carpeta `tasks/*.md`.

---

## Que mostra o visor?

1. **Resumo superior:** Orzamento total do proxecto, horas validadas en `Done`, límite WIP e botóns para abrir `BOARD.md`, `BACKLOG.md` ou `SCRUMBAN.md`.
2. **1. Taboleiro Operativo do Ciclo (`BOARD.md` + `Done`):**
   - Columnas con *Seleccionadas para o ciclo*, *En progreso*, *Pendentes de revisión e defensa* e *Validadas en Done*.
   - Cada tarxeta inclúe **ID**, **Título**, **Prioridade** (*Must/Should/Could*), **Etiquetas** coloreadas, **Descrición** extraída da ficha `tasks/tarefa-XX-...md`, **barra de progreso** de subtarefas (`- [x]`) e **horas**.
3. **2. Tarefas Planificadas en `BACKLOG.md` (`Ready`):**
   - Mostra todas as tarefas con ficha listas para entrar no taboleiro, indicando cales están xa activas no ciclo actual.
4. **3. Backlog de Melloras Candidatas (MoSCoW):**
   - Agrupadas en *Must have*, *Should have* e *Could have*.
5. **Visor Markdown integrado (panel lateral):**
   - Ao premer en **`📖 Abrir Visor MD`** en calquera tarxeta, ábrese un panel lateral coa ficha Markdown completamente renderizada (táboas, checkboxes, código, enlaces...).

---

## Dous xeitos de usalo

### Opción 1: Abrindo `index.html` directamente no navegador (sen servidor)

1. Fai dobre clic en `plugins/web-viewer/index.html` para abrilo en calquera navegador (Chrome, Firefox, Edge, Brave...).
2. Preme no botón verde **`📁 Seleccionar Carpeta (BOARD + BACKLOG + tasks/)`** e escolle a carpeta do proxecto (por exemplo, a carpeta `tfg/` ou a raíz do repositorio).
   *(Tamén podes arrastrar e soltar os ficheiros `.md` directamente sobre a caixa superior).*
3. O visor lerá en memoria `BOARD.md`, `BACKLOG.md` e todas as fichas de `tasks/` ao instante.

### Opción 2: Con servidor local (carga automática sen seleccionar ficheiros)

Se lanzas un servidor HTTP lixeiro na raíz do repositorio (ou dentro da carpeta `tfg/`), o visor detecta e carga automaticamente `BOARD.md`, `BACKLOG.md` e todas as fichas enlazadas en `tasks/`:

```bash
cd /home/hlfernandez/Docencia/TFG_TFM/metodoloxia-tfg-scrumban-ai-tdd
python3 -m http.server 8080
```

E abre no navegador:
- `http://localhost:8080/plugins/web-viewer/`

*(Se queres apuntar a outra subcarpeta por parámetro URL, podes usar `http://localhost:8080/plugins/web-viewer/?path=/ruta/a/tfg/`).*
