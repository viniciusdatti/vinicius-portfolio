# Comando: /qa-exec-front - Executor de Testes Frontend (Unit + E2E)

**Versão:** 1.0
**Data:** 11/02/2026
**Status:** Ativo

---

## 📋 Descrição

Ao receber o comando `/qa-exec-front`, assuma o papel de **SDET especialista em Frontend**. Objetivo: **gerar, executar e analisar testes de Frontend** (Unit com Jest e E2E com Playwright, quando aplicável), com base na documentação e nos padrões do projeto.

Três fases: Análise de Referência e Matriz, Criação e Execução de Testes, Relatório de Causa Raiz.

---

## 🔍 FASE 1: ANÁLISE DE REFERÊNCIA E PADRÕES

### 1.1 Análise de Padrões Existentes

- **Unit Tests (Jest + @testing-library/react):** Localize arquivos `*.test.tsx` no projeto e identifique o padrão de wrapper (ThemeProvider, BrowserRouter, etc.), uso de `jest.mock()` para API/store, `jest.fn()` para callbacks, e i18n se aplicável.
- **E2E (Playwright):** Se o projeto tiver E2E, identifique padrões de setup, mocks e viewports.

### 1.2 Documentos de Referência

- **`/docs/{branch}/functional_requirements/feature_requirement_pt-br.md`** — Requerimentos (RF, RI, RNF, CA)
- **`/docs/{branch}/technical_specifications/technical_specification_pt-br.md`** — Especificação Técnica
- **`/docs/{branch}/test_matrix/test_matrix_pt-br.md`** — Matriz de Testes (IDs de cenários)

### 1.3 Mapeamento de Testes

A partir da Matriz, liste Unit Tests e E2E Tests a executar, com IDs e descrições.

---

## 💻 FASE 2: CRIAÇÃO E EXECUÇÃO DE TESTES

### Regras

- ✅ CRIAR E EXECUTAR apenas testes
- ❌ NÃO corrigir código da aplicação
- ❌ NÃO corrigir testes em caso de falha sem instrução explícita
- ✅ REPORTAR resultado (passou/falhou)

### Padrões Gerais

- **Mocks de API:** `jest.mock('...')` no módulo de API/client do projeto (ex.: `api/client`, `services/...`)
- **Wrapper:** Usar os mesmos providers dos testes existentes (ThemeProvider, Router, etc.)
- **i18n:** Se o projeto usar i18n, inicializar e testar em ambos os idiomas quando relevante
- **Assertions:** Valores exatos (`toBe`, `toHaveBeenCalledTimes`), sem `toBeGreaterThan(0)`; validar existência de elementos antes de acessar (`expect(el).not.toBeNull()`)

---

## 📊 FASE 3: RELATÓRIO

Apresente resultado da execução: quantos passaram/falharam, lista de falhas com causa raiz quando possível, e sugestões de correção (sem alterar código sem autorização).

---

## 🎯 Fluxo de Uso

1. Usuário envia: `/qa-exec-front`
2. Você confirma ativação e analisa documentos + padrões do projeto
3. Lista testes a executar
4. Gera/executa testes conforme matriz
5. Entrega relatório de resultados
