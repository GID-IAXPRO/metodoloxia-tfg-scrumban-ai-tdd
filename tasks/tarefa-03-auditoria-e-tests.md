# Tarefa 3: Auditoría técnica do código e mellora da infraestrutura de tests (Unitarios e E2E)

## Metadatos

- **ID:** T3
- **Estado:** `Planificada`
- **Prioridade:** `Should have` (auditoría) / `Must have` (mellora da rede de tests)
- **Etiquetas:** `refactoring`, `testing`, `ai-evaluation`
- **Horas estimadas:** 45 h
- **Horas reais dedicadas:** — h
- **Data de inicio:** —
- **Data de finalización:** —

---

## 1. Descrición

Esta tarefa combina dous obxectivos orientados a asegurar a calidade técnica do proxecto antes de abordar os bloques funcionais máis complexos:

1. **Auditoría técnica asistida por IA:** Empregar axentes de IA para revisar a base de código en busca de bugs potenciais, problemas de xestión de recursos, tratamento de excepcións ou acoplamentos arquitectónicos, contrastando cada achado para distinguir problemas reais de **falsos positivos**.
2. **Mellora da cobertura de tests (Unitarios e E2E):** Medir a cobertura actual, identificar partes críticas sen probas suficientes e crear novos tests unitarios, de integración ou *end-to-end* (E2E) que sirvan como rede de seguridade para o resto do TFG/TFM.

## 2. Obxectivos e pasos recomendados

- [ ] **1. Auditoría da base de código con IA:**
  - [ ] Analizar os módulos principais buscando posibles bugs, problemas de deseño ou código sen probar.
  - [ ] Verificar manualmente cada problema reportado pola IA, clasificándoo por gravidade e indicando se é **Confirmado** ou **Falso positivo**.
  - [ ] Propoñer que melloras ou correccións se incorporan a [`BACKLOG.md`](../BACKLOG.md).
- [ ] **2. Mellora da infraestrutura de tests:**
  - [ ] Medir a liña base de cobertura de tests.
  - [ ] Deseñar e implementar con axuda da IA novos tests unitarios e E2E sobre os fluxos críticos.
  - [ ] Verificar a mellora na cobertura e a estabilidade da suite de probas.

## 3. Entregables verificables

1. **Informe de auditoría** coa listaxe de problemas confirmados vs. falsos positivos da IA.
2. **Informe comparativo de cobertura de tests** (antes vs. despois) e novos tests integrados no repositorio.
3. **Proposta de actualización de `BACKLOG.md`** coas melloras técnicas prioritarias.
4. **Rexistro de emprego da IA** cuberto na sección 5 desta ficha.

## 4. Criterios de aceptación (*Definition of Done*)

- [ ] Todos os achados do informe de auditoría foron contrastados polo estudante e cuantificáronse os falsos positivos da IA.
- [ ] A cobertura de tests (unitarios e/ou E2E) mellorou de forma medible e todas as probas pasan de maneira estable.
- [ ] A débeda cognitiva está baixo control e o estudante pode defender nas reunións que garantías ofrecen os novos tests.
- [ ] O rexistro de emprego da IA (sección 5) está completamente cuberto.

---

## 5. Rexistro de emprego da IA *(cubrir ao completar a tarefa)*

| Campo | Rexistro |
|---|---|
| **Tarefa** | Tarefa 3: Auditoría técnica e mellora da infraestrutura de tests |
| **Ferramenta / Modelo** | |
| **Análise** | |
| **Deseño** | |
| **Código** | |
| **Tests** | *(Detallar a calidade dos tests unitarios / E2E xerados pola IA)* |
| **Revisión** | *(Detallar a precisión da IA na auditoría: problemas reais vs. falsos positivos)* |
| **Tempo total dedicado** | |
| **Tempo de revisión/corrección** | |
| **Resultado** | |
| **Observacións** | |

### Prompts representativos ou aprendizaxes para *skills*

*(Anotar aquí os prompts que deron mellores resultados para auditoría e xeración de tests).*
