# Metodoloxía do TFG/TFM: Scrumban + AI-Driven Development (AIDD)

## 1. Xustificación metodolóxica

Este Traballo de Fin de Grao / Mestrado ten unha carga de **300 horas** e é desenvolvido por un único estudante que a miúdo parte sen coñecemento previo da base de código ou das tecnoloxías do proxecto, cun alcance parcialmente aberto (melloras candidatas que se seleccionan segundo o avance) e cun dobre obxectivo: **desenvolver/evolucionar o sistema software** e **avaliar empiricamente o desenvolvemento asistido por IA**.

Por estas razóns, en lugar dun Scrum estrito (pensado para equipos con roles e sprints pechados), adóptase:

> **Desenvolvemento iterativo e incremental seguindo un enfoque Scrumban, integrado cun protocolo de desenvolvemento asistido por IA (*AI-Driven Development*).**

De Scrum mantéñense o backlog de produto priorizado, a planificación periódica, as revisións regulares e as entregas incrementais; de Kanban adóptase o fluxo continuo mediante taboleiro operativo, a limitación do traballo en curso (WIP) e a flexibilidade para adaptar tarefas segundo os descubrimentos técnicos.

---

## 2. O modelo Scrumban aplicado ao TFG/TFM

### Separación de artefactos: `BACKLOG.md` vs `BOARD.md`

En tempos de desenvolvemento asistido por IA, as tarefas poden avanzar moi rápido polo taboleiro operativo cando se apoian en axentes. Por iso sepáranse dous artefactos con responsabilidades claras:

1. **[`BACKLOG.md`](./BACKLOG.md) (Mantido principalmente polo Titor / *Product Owner*):**
   - Contén a visión global do produto: as tarefas **`Ready`** (definidas e priorizadas), o **Backlog de melloras candidatas** (MoSCoW) e o histórico inmutable de tarefas **`Done`** (unha vez defendidas e validadas).
2. **[`BOARD.md`](./BOARD.md) (Mantido polo Estudante durante o ciclo de 10–15 días):**
   - Contén unicamente o traballo activo do ciclo actual: **Seleccionadas para o ciclo** → **En progreso** (WIP máx. 1) → **Pendentes de revisión e defensa (`In Review`)**.

### Elementos principais

| Elemento | Aplicación no proxecto |
|---|---|
| **Product Backlog (`BACKLOG.md`)** | Lista priorizada de tarefas `Ready`, melloras candidatas e histórico `Done`. Xestionado polo titor. |
| **Priorización (MoSCoW)** | Clasificación en *Must have* (fundamentais), *Should have* (desexables) e *Could have* (opcionais segundo tempo). |
| **Taboleiro Operativo (`BOARD.md`)** | Fluxo do ciclo: `Selected` → `In Progress` → `In Review / Ready for Defense`. Xestionado polo estudante. |
| **Iteracións / Ciclos** | Períodos de traballo de 10–15 días orientados a entregas verificables e defendibles. |
| **Límite WIP (*Work In Progress*)** | **Unha única tarefa de desenvolvemento importante en `In Progress`.** Evita acumular código xerado por IA sen probar nin asimilar. |
| **Estimación e control** | Rexistro de horas estimadas vs. horas totais realmente dedicadas (indicando que porcentaxe estimada dese tempo se investiu en supervisión/corrección) sobre o total de 300 h. |
| **Trazabilidade en Git** | **Commit obrigatorio en cada cambio de estado da tarefa** (`Selected` → `In Progress` → `In Review` → `Done`) e referencia ao ID da tarefa (`T1`, `T2`...) nos commits de código para auditar tempos e avances. |

### Categorías de tarefas (Etiquetas)

Para clasificar o traballo en `BACKLOG.md`, `BOARD.md` e nas fichas de `tasks/`, pódense empregar etiquetas como as seguintes (adaptables ao proxecto):

| Etiqueta | Contido |
|---|---|
| `learning` | Familiarización coa arquitectura, código existente, dominio e tecnoloxías. |
| `feature` | Novas funcionalidades ou módulos do sistema. |
| `testing` | Tests unitarios, de integración, E2E e monitorización. |
| `refactoring` | Auditoría de código, corrección de bugs e melloras arquitectónicas/técnicas. |
| `ai-evaluation` | Protocolo, rexistro e avaliación do desenvolvemento asistido por IA. |
| `documentation` | Documentación técnica, memoria e creación de *skills* ou regras para axentes de IA. |

### Reunións de seguimento, defensa e avaliación formativa (cada 10–15 días)

Cada reunión estrutúrase en dous bloques e actúa como mecanismo de **avaliación continua e formativa**:

1. **Revisión e Defensa do período anterior (Control da Débeda Cognitiva):**
   - Co uso de axentes de IA é doado producir moito código en pouco tempo, o que xera o risco de **débeda cognitiva** (*Cognitive Debt*): incorporar solucións que o estudante non comprende a nivel estrutural ou cuxos fallos non sabe diagnosticar.
   - Para que cada tarefa en `BOARD.md (In Review)` pase ao histórico `Done` de `BACKLOG.md`, o estudante debe **defender** o seu traballo demostrando:
     - **Control arquitectónico:** Explicar como encaixa a solución na arquitectura do sistema, que compoñentes se crearon/modificaron e verificar que a arquitectura evoluciona conforme ao esperado (non se esixe auditar ou memorizar cada liña individual de código, senón ter o control do deseño e das decisións técnicas).
     - **Verificación mediante tests (Unitarios e E2E):** Demostrar que se incorporaron probas automatizadas (unitarias, de integración ou *end-to-end*) que validan o comportamento esperado e protexen fronte a regresións.
     - **Responsabilidade (*Ownership*) e supervisión:** O estudante responde do funcionamento do sistema; debe explicar onde houbo que corrixir ou guiar á IA e demostrar capacidade para diagnosticar e resolver fallos inesperados ou comportamentos non supervisados.
     - **Análise de tempos e *skills*:** Revisar as horas totais dedicadas, a proporción dese tempo que requiriu supervisión/corrección do xerado pola IA e que aprendizaxes se incorporan ás *skills* ou regras de contexto do proxecto.
2. **Planificación do seguinte período:**
   - Revisar e actualizar `BACKLOG.md` (se entra unha tarefa nova importante, avaliar que outra se pospón para respectar as 300 h).
   - Seleccionar as próximas tarefas `Ready` para pasalas ao `BOARD.md` do novo ciclo.
   - Identificar dependencias, riscos arquitectónicos e acordar os entregables e probas que se defenderán na seguinte reunión.

---

## 3. Criterios de control: *Definition of Ready* e *Definition of Done*

Para evitar unha falsa sensación de avance ao xerar código con IA, aplícanse dous filtros:

### *Definition of Ready (DoR)* — Para estar en `BACKLOG.md (Ready)` e poder entrar ao ciclo
Unha tarefa só pode iniciarse cando ten a súa ficha creada en `tasks/` e están claros:
1. Que problema resolve ou que obxectivo persegue.
2. Que entregables, encaixe arquitectónico e resultados concretos se esperan.
3. Con que probas (unitarias / E2E) ou criterios se vai comprobar que funciona correctamente.

### *Definition of Done (DoD)* — Para pasar de `BOARD.md (In Review)` a `BACKLOG.md (Done)`
Unha tarefa só se considera `Done` cando cumpre **todos** estes puntos:
1. A funcionalidade ou entregable cumpre os requisitos definidos na ficha.
2. **A arquitectura evoluciona segundo o esperado**, seguindo as convencións e patróns do proxecto sen introducir débeda técnica nin solucións acopladas ou improvisadas polo axente.
3. **Existen tests adecuados (unitarios e/ou E2E)** que pasan correctamente sen regresións.
4. **A débeda cognitiva está baixo control:** o estudante comprende o deseño implementado, defendeu a solución na reunión de seguimento e asume a responsabilidade (*ownership*) ante posibles fallos.
5. A documentación (e as *skills* / regras de IA, se aplica) está actualizada.
6. **A sección "Rexistro de emprego da IA" da ficha da tarefa está completamente cuberta.**
7. **Rexistráronse en Git os commits correspondentes a cada cambio de estado da tarefa** (inicio, paso a revisión e validación a `Done`).

---

## 4. Integración co *AI-Driven Development Manifesto* (AIDD)

Como base filosófica e técnica do uso da IA, adóptanse os valores e principios do **[AI-Driven Development Manifesto](https://www.ai-driven-development.org/)**:

1. **Method over Model:** Importa máis o método de traballo estruturado que o modelo ou ferramenta concreta.
2. **Ownership over Delegation:** O estudante é o responsable último de todo o código, arquitectura e comportamento que entrega, incluído o xerado pola IA.
3. **Understanding over Acceptance:** Non se acepta unha evolución do sistema cuxa estrutura, fluxo e impacto arquitectónico non se comprendan nin estean respaldados por probas.
4. **Outcome over Output:** O éxito mídese polo resultado funcional, a súa estabilidade e a súa calidade arquitectónica, non pola velocidade ou cantidade de liñas xeradas polo axente.

Principios clave aplicados no día a día:
- Planificar e acordar o deseño antes de pedir á IA que xere código.
- Dividir o traballo en incrementos pequenos e verificables.
- Construír un contexto preciso para a IA.
- Apoiarse en tests automatizados (unitarios e E2E) como rede de seguridade.
- Documentar as aprendizaxes do proxecto mediante regras e **skills reutilizables**.

### Protocolo de traballo con IA por fases

En cada tarefa de desenvolvemento, a colaboración entre a IA e o estudante segue este reparto de responsabilidades:

| Fase | Papel da IA | Papel do estudante |
|---|---|---|
| **1. Análise** | Axudar a explorar o repositorio, localizar compoñentes e explicar fluxos existentes. | Comprender o problema, formular preguntas concretas e contrastar coa arquitectura real. |
| **2. Deseño** | Propoñer solucións, patróns e alternativas de implementación. | Avaliar as propostas e tomar as decisións arquitectónicas coherentes co proxecto. |
| **3. Planificación** | Descompoñer a funcionalidade en pasos pequenos e secuenciais. | Revisar, axustar e aprobar o plan antes de xerar código. |
| **4. Implementación** | Xerar código, refactorizar e implementar compoñentes. | Supervisar a evolución arquitectónica, guiar o axente e corrixir desviacións. |
| **5. Validación** | Propoñer casos de proba, xerar tests unitarios/E2E e buscar posibles erros. | Executar os tests, validar casos límite e responder ante fallos inesperados. |
| **6. Documentación** | Axudar a redactar documentación técnica e estruturar *skills*. | Validar a exactitude técnica e consolidar as *skills* aprendidas. |

---

## 5. Rexistro e avaliación científica do emprego da IA

Non é necesario gardar todas as conversas completas coas ferramentas de IA, pero **si é obrigatorio cubrir o rexistro estruturado ao final de cada ficha en `tasks/`** e conservar os *prompts* ou *skills* máis representativos.

### Modelo de rexistro por tarefa (incluído en cada ficha de `tasks/`)

| Campo | Descrición / Exemplo |
|---|---|
| **Tarefa** | Nome e identificador da tarefa (ex. *Tarefa 2: Implementación de funcionalidade X*) |
| **Ferramenta / Modelo** | Ferramentas, axentes e versións dos modelos empregados |
| **Análise** | Como se usou a IA na exploración e comprensión do problema |
| **Deseño** | Como interveu na proposta de arquitectura ou estrutura |
| **Código** | Grao de xeración (parcial/total, autónoma/guiada) |
| **Tests** | Uso da IA na xeración e deseño de casos de proba (unitarios / E2E) |
| **Revisión** | Uso da IA para revisión de código ou detección de bugs |
| **Tempo total dedicado** | Horas totais investidas na tarefa, que computan para as 300 h do proxecto (ex. *6 h*) |
| **Esforzo de supervisión/corrección (% dentro do total)** | Porcentaxe orientativa ou nivel do *Tempo total dedicado* investido en comprender, depurar e corrixir o xerado pola IA (ex. *Baixo (<20%) / Medio (20–50%) / Alto (>50%), ~25%*) |
| **Resultado** | *Aceptado sen cambios* / *Aceptado con modificacións* / *Parcialmente descartado* / *Reescrito* |
| **Observacións** | Desviacións arquitectónicas, erros cometidos pola IA, limitacións ou acertos destacables |

### Dimensións de avaliación para a memoria do TFG/TFM

Coas fichas acumuladas en `tasks/`, realizarase un **estudo de caso observacional** estruturado en catro dimensións:

1. **Produtividade:**
   - Horas totais por tarefa (fronte ás estimadas), proporción estimada do tempo dedicada á supervisión/corrección do xerado pola IA fronte á implementación directa, e número de tarefas completadas.
2. **Calidade do software e estabilidade:**
   - Evolución da cobertura de tests (unitarios, integración e E2E), coherencia arquitectónica, defectos detectados na validación e resultados da auditoría.
3. **Eficacia do uso da IA:**
   - En que fases achega máis valor e en cales require máis retraballo; tipos de erros frecuentes; comparación de resultados **antes e despois de crear *skills* ou regras específicas** do proxecto.
4. **Control da débeda cognitiva, aprendizaxe e autonomía:**
   - Evolución na capacidade do estudante para manter o control da arquitectura do sistema, defender as decisións técnicas nas reunións, definir boas baterías de tests e diagnosticar/resolver fallos inesperados con autonomía.

---

## 6. Distribución orientativa das 300 horas (Exemplo adaptable)

Esta distribución serve como liña base revisable nas reunións quincenais segundo a natureza do proxecto:

| Bloque / Tarefa | Horas estimadas |
|---|---:|
| **1.** Familiarización co dominio/arquitectura, liña base e protocolo AIDD | 35–45 h |
| **2.** Primeira funcionalidade sinxela e creación das primeiras *skills* / regras de contexto | 30–35 h |
| **3.** Auditoría técnica e mellora da infraestrutura de tests (unitarios / E2E) | 40–60 h |
| **4.** Desenvolvemento dos bloques funcionais principais do TFG/TFM | 120–140 h |
| **5.** Melloras adicionais opcionais do Backlog (*Could have*) | 20–25 h |
| **6.** Avaliación global das métricas de IA, validación final e redacción da memoria | 25–30 h |
| **Total** | **300 h** |
