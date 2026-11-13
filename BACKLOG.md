# Product Backlog do TFG/TFM (BACKLOG)

> **Rol responsable principal:** Titor / *Product Owner*.  
> Este ficheiro é o artefacto de entrada e rexistro oficial do proxecto. Contén as tarefas **Ready** (definidas e listas para entrar no taboleiro do ciclo), o **Backlog de Produto** (melloras candidatas clasificadas por MoSCoW) e o histórico de tarefas **Done** (unha vez defendidas e validadas nas reunións de seguimento).  
> O traballo operativo durante cada ciclo de 10–15 días xestiónao o estudante en [`BOARD.md`](./BOARD.md).

**Orzamento total do proxecto:** 300 horas  
**Horas validadas en `Done`:** 0 h / 300 h

---

## 1. Tarefas `Ready` (Planificadas e listas para iniciar)

Tarefas que cumpren a *Definition of Ready*, teñen a súa ficha creada en [`tasks/`](./tasks/) e están ordenadas segundo a **prioridade de execución acordada** (as filas superiores abórdanse primeiro).

> **Nota sobre os identificadores (`T1`, `T2`, `T6`...):** O ID asígnase por orde de creación da ficha e é permanente. Se unha tarefa nova (ex. `T6`) se prioriza para facerse antes ca unha existente (ex. `T5`), simplemente colócase por riba nesta táboa sen renomear os ficheiros nin os IDs.

| ID | Tarefa | Prioridade | Etiquetas | Horas Est. | Ficha |
|---|---|---|---|---:|---|
| **T1** | Familiarización coa arquitectura do proxecto, posta en marcha e protocolo AIDD | `Must have` | `learning`, `ai-evaluation`, `documentation` | 35 h | [`tarefa-01-familiarizacion-arquitectura.md`](./tasks/tarefa-01-familiarizacion-arquitectura.md) |
| **T2** | Implementación dunha primeira funcionalidade sinxela e creación da primeira *skill* | `Must have` | `feature`, `documentation`, `ai-evaluation` | 35 h | [`tarefa-02-primeira-funcionalidade-skills.md`](./tasks/tarefa-02-primeira-funcionalidade-skills.md) |
| **T3** | Auditoría técnica do código e mellora da infraestrutura de tests (unitarios e E2E) | `Should have` | `refactoring`, `testing`, `ai-evaluation` | 45 h | [`tarefa-03-auditoria-e-tests.md`](./tasks/tarefa-03-auditoria-e-tests.md) |

---

## 2. Backlog de melloras candidatas e peche (`Product Backlog`)

Elementos pendentes de refinar e activar en función do avance e do tempo dispoñible. Cando nas reunións de 10–15 días se decida abordar unha destas tarefas, crearase a súa ficha en `tasks/` a partir de [`tasks/_PLANTILLA.md`](./tasks/_PLANTILLA.md) e pasarase á táboa **1. Tarefas `Ready`**.

> **Regra de xestión do alcance:** Se se incorpora unha tarefa nova importante ao plan activo, débese avaliar que outra tarefa se pospón ou descarta para non superar as 300 horas totais.

### Must have (Obxectivos fundamentais pendentes de desagregar)
- [ ] **[Exemplo] Desenvolvemento do módulo / funcionalidade principal A** (`feature`, `testing`) — *Est.: 70 h*.
- [ ] **[Exemplo] Desenvolvemento do módulo / funcionalidade principal B** (`feature`, `testing`) — *Est.: 60 h*.
- [ ] **Avaliación global do desenvolvemento asistido por IA e redacción da memoria** (`ai-evaluation`, `documentation`) — *Est.: 25 h*. Análise agregada das fichas de rexistro de IA (produtividade, calidade, eficacia das *skills*, control da débeda cognitiva).

### Should have (Obxectivos desexables)
- [ ] **[Exemplo] Corrección de problemas prioritarios detectados na auditoría (Tarefa 3)** (`refactoring`, `testing`).
- [ ] **[Exemplo] Validación das *skills* creadas implementando unha segunda funcionalidade comparable** (`feature`, `ai-evaluation`).

### Could have (Ampliacións opcionais — ~20–30 h reservadas)
- [ ] **[Exemplo] Integración opcional con servizo ou ferramenta externa X** (`feature`).
- [ ] **[Exemplo] Optimización de rendemento ou melloras de usabilidade na interface** (`refactoring`, `feature`).

---

## 3. Histórico de tarefas `Done` (Validadas e defendidas)

Tarefas que cumpriron a *Definition of Done*, teñen cuberto o **Rexistro de emprego da IA** na súa ficha e **superaron a defensa na reunión de seguimento** (arquitectura controlada, cobertura de tests adecuada e débeda cognitiva baixo control). Non se borran nunca para manter a trazabilidade do proxecto:

| ID | Tarefa | Prioridade | Horas Est. | Horas Reais | Data validación | Ficha |
|---|---|---|---:|---:|---|---|
| — | — | — | — | — | — | — |
