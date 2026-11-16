# Xestión e Metodoloxía do TFG/TFM: Scrumban + AI-Driven Development (AIDD)

## Resumo do Proxecto

**Título do TFG/TFM:** *[Indicar aquí o título do TFG/TFM]*  
**Obxectivo xeral:** *[Describir brevemente o obxectivo principal do proxecto, ademais de avaliar o impacto do desenvolvemento asistido por IA no proceso (300 horas)]*.

## Metodoloxía

Este traballo segue a seguinte metodoloxía formal:

> **Desenvolvemento iterativo e incremental seguindo un enfoque Scrumban, integrado cun protocolo de desenvolvemento asistido por IA (*AI-Driven Development*).**

A metodoloxía combina tres piares fundamentais (detallados en [`SCRUMBAN.md`](./SCRUMBAN.md)):

1. **Xestión do proxecto con Scrumban:** Separación clara entre o backlog de produto (`BACKLOG.md`, mantido principalmente polo titor/*Product Owner*) e o taboleiro operativo do ciclo (`BOARD.md`, mantido polo estudante), estruturado en iteracións curtas de revisión, defensa e planificación cada **10–15 días**.
2. **Desenvolvemento guiado por principios AIDD:** Adopción do [AI-Driven Development Manifesto](https://www.ai-driven-development.org/), onde a IA actúa como colaborador en análise, deseño, implementación, probas e documentación, mantendo sempre o control arquitectónico, a validación mediante tests e a responsabilidade final (*ownership*) no estudante.
3. **Avaliación empírica do uso da IA:** Rexistro sistemático do emprego de ferramentas e axentes de IA en cada tarefa para analizar o seu impacto na produtividade, calidade do software, cobertura de probas e control da débeda cognitiva.

---

## Como xestionar o proxecto neste repositorio

En lugar de empregar ferramentas externas complexas, todo o seguimento metodolóxico, a planificación de tarefas e o rexistro de uso da IA xestiónanse mediante **ficheiros Markdown versionados en Git** dentro deste directorio.

### Estrutura de ficheiros

```text
.
├── README.md          # Guía rápida do sistema de xestión do TFG/TFM
├── SCRUMBAN.md        # Definición detallada da metodoloxía Scrumban + Protocolo AIDD
├── BACKLOG.md         # Product Backlog (xestionado polo titor: Ready, Candidatas e Done)
├── BOARD.md           # Taboleiro operativo do ciclo actual (xestionado polo estudante)
├── tasks/             # Fichas individuais de cada tarefa do proxecto
│   ├── _PLANTILLA.md
│   ├── tarefa-01-familiarizacion-arquitectura.md
│   ├── tarefa-02-primeira-funcionalidade-skills.md
│   └── tarefa-03-auditoria-e-tests.md
└── plugins/           # Ferramentas visuais para consultar BOARD.md, BACKLOG.md e tasks/
    ├── vscode-scrumban/   # Extensión de VS Code (visor Kanban + Backlog integrado)
    └── web-viewer/        # Visor web autónomo (index.html sen dependencias)
```

### 1. O Backlog de Produto (`BACKLOG.md`) — *Rol principal: Profesor / Product Owner*

O ficheiro [`BACKLOG.md`](./BACKLOG.md) é o artefacto de entrada e control global do proxecto:
- **Tarefas `Ready` (Planificadas):** Tarefas xa definidas coa súa ficha en `tasks/`, priorizadas e listas para ser levadas a `BOARD.md`.
- **Backlog de melloras candidatas:** Requisitos e ideas clasificadas por prioridade MoSCoW (*Must have*, *Should have*, *Could have*) pendentes de activar segundo o avance.
- **Histórico `Done`:** Rexistro permanente das tarefas que xa foron completadas, validadas e defendidas nas reunións de seguimento, xunto co cómputo oficial de horas sobre as **300 horas** totais.

### 2. O Taboleiro Operativo (`BOARD.md`) — *Rol principal: Estudante*

O ficheiro [`BOARD.md`](./BOARD.md) reflicte o estado vivo do traballo durante cada ciclo de 10–15 días. Como co uso de axentes de IA a xeración de código pode ser moi rápida, o taboleiro actúa como freo de calidade antes de dar nada por pechado:
- **Seleccionadas para o ciclo actual:** Tarefas traídas desde `BACKLOG.md (Ready)` para abordar no período actual.
- **En progreso (Límite WIP = 1):** Tarefa activa nese momento.
- **Pendentes de revisión e defensa (`In Review`):** Tarefas que o estudante xa rematou co axente (con tests pasando e rexistro de IA cuberto), pero que esperan á reunión quincenal para ser defendidas antes de pasar ao `Done` de `BACKLOG.md`.

### 3. A carpeta de tarefas (`tasks/`)

Todas as fichas almacénanse directamente dentro de [`tasks/`](./tasks/) sen subcarpetas por estado ou categoría. Isto garante que **os enlaces desde `BACKLOG.md`, `BOARD.md` e desde a memoria nunca se rompan** cando unha tarefa cambia de estado.

> **Nota sobre a numeración (`T1`, `T2`... / `tarefa-01`, `tarefa-02`...):** O número de cada tarefa actúa como **identificador único (ID) por orde de creación** (como os *issues* en GitHub ou Jira) e **nunca debe renomearse**, aínda que nas reunións de seguimento se decida repriorizar e executar unha tarefa posterior antes ca outra (por exemplo, facer `T6` antes que `T5`). A orde real de execución reflíctese na posición dentro da táboa `Ready` de `BACKLOG.md` e nas datas de inicio/peche de cada ficha.

Cada tarefa ten un ficheiro con nome `tarefa-XX-nome-descritivo.md` que inclúe:
1. **Metadatos:** Estado, prioridade (*Must/Should/Could*), etiquetas (`learning`, `feature`, `testing`, `refactoring`, `ai-evaluation`, `documentation`), horas estimadas e horas reais.
2. **Obxectivos e subtarefas:** Que se quere conseguir e que pasos se deben dar.
3. **Entregables e *Definition of Done*:** Criterios verificables para dar a tarefa por lista para revisión.
4. **Rexistro de emprego da IA:** Unha ficha estandarizada que **se cobre obrigatoriamente ao rematar a tarefa**, documentando ferramentas/modelos usados, intervención por fases, tempo total dedicado e proporción estimada de supervisión/corrección sobre ese total, erros da IA detectados e aprendizaxes ou *skills* xeradas.

---

## Fluxo de traballo, Trazabilidade en Git e Reunións de Defensa (cada 10–15 días)

> **Regra de trazabilidade en Git (Commits obrigatorios en cada cambio de estado):**  
> Dado que o taboleiro e as tarefas se xestionan en Markdown, **o historial de Git é a fonte de verdade para auditar os tempos e a evolución do proxecto**. Por tanto, **en cada cambio de estado dunha tarefa é obrigatorio facer un commit específico** que rexistre a transición (data/hora exacta) e vencelle o código desenvolvido co ID da tarefa (`T1`, `T2`...).

1. **Inicio de tarefa (`Selected` → `In Progress`):**
   - Tomar a seguinte tarefa seleccionada en `BOARD.md` (que vén de `BACKLOG.md -> Ready`).
   - Movela á táboa **En progreso** en `BOARD.md` e actualizar o estado e a `Data de inicio` na súa ficha `tasks/tarefa-XX-...md`.
   - **Commit de inicio obrigatorio:** Rexistrar o cambio de estado antes de empezar a desenvolver (ex. `chore(T2): iniciar tarefa T2 en BOARD`).
2. **Execución baixo o protocolo AIDD:**
   - Seguir as fases de Análise → Deseño → Planificación → Implementación → Validación → Documentación.
   - Incluír o identificador da tarefa nos commits de código e documentación (ex. `feat(T2): ...`, `test(T2): ...`) para manter a trazabilidade do que se fixo en cada tarefa.
   - Ir anotando na ficha da tarefa as horas dedicadas e as observacións relevantes sobre o comportamento da IA.
3. **Paso a Revisión (`In Progress` → `In Review`):**
   - Verificar todos os puntos da *Definition of Done* da ficha (especialmente os tests unitarios e/ou E2E).
   - Cubrir na propia ficha a sección **"Rexistro de emprego da IA"**, as horas reais e a data de finalización.
   - Mover a tarefa á sección **Pendentes de revisión e defensa** en `BOARD.md`.
   - **Commit de paso a revisión obrigatorio:** Rexistrar que a tarefa está rematada polo estudante e lista para defender (ex. `chore(T2): pasar T2 a revision e cubrir rexistro IA`).
4. **Reunión de seguimento, defensa e avaliación formativa (cada 10–15 días):**
   - No desenvolvemento asistido por IA, un axente pode xerar unha funcionalidade en poucas horas, creando o risco de acumular **débeda cognitiva** (*Cognitive Debt*): código que aparentemente funciona pero cuxo deseño, integración ou efectos secundarios o estudante non controla.
   - Por tanto, para que unha tarefa pase de `BOARD.md (In Review)` ao histórico `Done` de `BACKLOG.md`, **o estudante debe DEFENDER o traballo realizado** nunha avaliación continua e formativa centrada en:
     1. **Control da arquitectura:** Demostrar que a estrutura xeral do proxecto se mantén baixo control e evoluciona conforme ao esperado, explicando que compoñentes/módulos interveñen e por que se tomou ese camiño arquitectónico (non se trata de auditar ou memorizar cada liña de código xerada, senón de dominar o deseño e a integración).
     2. **Garantía mediante tests (Unitarios e E2E):** Demostrar con probas automatizadas (unitarias, de integración ou *end-to-end*) que a funcionalidade cumpre os requisitos, cobre casos límite e non introduce regresións.
     3. **Responsabilidade (*Ownership*) ante fallos:** O estudante é o responsable último do código entregado. Debe demostrar supervisión sobre o que fixo o axente e ser quen de responder, diagnosticar e corrixir calquera fallo inesperado ou comportamento non supervisado que xurda.
   - **Commit de validación (`In Review` → `Done`):** Unha vez superada a defensa, pásase a tarefa ao histórico `Done` de `BACKLOG.md`, selecciónanse as tarefas do seguinte ciclo en `BOARD.md` e faise un commit de peche de ciclo (ex. `chore(backlog): validar T2 en Done e planificar seguinte ciclo`). Se se detecta unha débeda cognitiva elevada ou falta de garantías nos tests, a tarefa permanece en revisión ata consolidarse.

---

## Ferramentas de visualización (`plugins/`)

Aínda que todos os artefactos (`BOARD.md`, `BACKLOG.md` e `tasks/*.md`) son ficheiros Markdown lexibles directamente en calquera editor ou en GitHub/GitLab, o repositorio inclúe na carpeta [`plugins/`](./plugins/) dúas ferramentas visuais para consultar o taboleiro Kanban, o estado das subtarefas, as etiquetas e o backlog dunha ollada:

1. **Extensión para VS Code ([`plugins/vscode-scrumban/`](./plugins/vscode-scrumban/README.md)):**
   - Engade un visor interactivo dentro de Visual Studio Code que detecta automaticamente `BOARD.md` e `BACKLOG.md`.
   - Mostra as columnas do taboleiro activo, as tarefas `Ready` e as melloras candidatas MoSCoW debaixo, extraendo a descrición e o progreso de cada ficha `tasks/tarefa-XX-...md` e permitindo abrir directamente o visor de Markdown de VS Code.
   - Xérase o paquete instalable `.vsix` executando `python3 plugins/vscode-scrumban/build-vsix.py`.
2. **Visor Web Independente ([`plugins/web-viewer/`](./plugins/web-viewer/README.md)):**
   - Aplicación web autónoma nun único ficheiro [`plugins/web-viewer/index.html`](./plugins/web-viewer/index.html) sen dependencias externas.
   - Permite seleccionar ou arrastrar a carpeta do proxecto directamente no navegador (ou servila por HTTP) para visualizar o taboleiro Scrumban, o `BACKLOG.md` e abrir calquera ficha cun visor Markdown lateral integrado.
