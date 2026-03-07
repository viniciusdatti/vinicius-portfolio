# Comando: /test-matrix - Gerador de Matriz de Testes

**Versão:** 1.0
**Data:** 11/02/2026
**Status:** Ativo

---

## 📋 Descrição

Ao receber o comando `/test-matrix`, assuma o papel de **Engenheiro de QA e Desenvolvedor Senior focado em testes**. Objetivo: gerar uma **Matriz de Testes Completa** para validar a implementação de uma feature, com base no **Documento de Requisitos** e na **Especificação Técnica**.

---

## 🔍 FASE 1: INVESTIGAÇÃO TÉCNICA

### 1.1 Análise de Impacto de Testes

Identifique todos os componentes testáveis afetados:

- **Backend - Services:** Quais métodos de service serão criados ou modificados
- **Backend - API:** Quais endpoints e schemas de validação mudam
- **Backend - Models:** Quais models ou utilitários auxiliares são impactados
- **Frontend - Componentes:** Quais componentes React serão criados ou modificados
- **Frontend - Views:** Quais views/páginas são impactadas
- **Frontend - Hooks/Utils:** Quais hooks ou utilitários compartilhados são afetados

### 1.2 Mapeamento de Padrões Existentes

- **Backend:** Localizar arquivos de teste do serviço impactado
- **Frontend:** Localizar arquivos `*.test.tsx` nos diretórios dos componentes/views impactados
- **Identificar:** Build functions, mocks de services, mocks de API, padrões de wrapper

### 1.3 Classificação de Cenários

- **Implementáveis:** Cenários executáveis com a infraestrutura atual (jest.mock, testing-library)
- **TODO (Fora do Escopo):** Cenários que requerem infraestrutura não disponível (E2E, acessibilidade, etc.)

### 1.4 Perguntas de Refino

- **Escopo:** Há componentes que devem ser priorizados nos testes?
- **Cobertura:** Alguma camada já possui testes que precisam apenas de extensão?
- **Cenários críticos:** Há edge cases que devem ser cobertos?
- **Regressão:** Quais funcionalidades existentes podem ser afetadas?

---

## 📄 FASE 2: DOCUMENTAÇÃO (APÓS 'OK' OU 'GERAR')

### 2.1 Localização

**Caminho:** `/docs/{nome-da-branch}/test_matrix/test_matrix_pt-br.md`

### 2.2 Seções Obrigatórias

1. **Contexto de Testes** — Tabela com framework e padrões por camada
2. **Convenções** — Convenções do projeto (wrapper, mocks de API, i18n, etc.)
3. **Sumário** — Índice navegável
4. **Seções por Camada** — Backend (services, API), Frontend (componentes, views)
5. **Tabelas de Cenários** — ID, Cenário, Mock, Execução, Validação, CA
6. **Testes de Regressão**
7. **TODO - Melhorias Futuras** — Cenários fora do escopo atual
8. **Apêndice A: Mapeamento CA → Testes**
9. **Apêndice B: Fixtures de Teste**
10. **Apêndice C: Contagem de Testes**
11. **Histórico de Revisões**

### 2.3 Convenções de IDs

| Camada | Prefixo | Exemplo |
|--------|---------|---------|
| Backend - Service | `UT-XX-NNN` | `UT-XX-001` |
| Backend - API | `BE-API-NNN` | `BE-API-001` |
| Frontend - Componente | `FE-XXXX-NNN` | `FE-CARD-001` |
| Frontend - View | `FE-XXXX-NNN` | `FE-HOME-001` |
| Regressão | `REG-BE-NNN` / `REG-FE-NNN` | |
| TODO | `TODO-CAT-NNN` | `TODO-PERF-001` |

### 2.4 Idioma

- **Português (Brasil)** em todo o documento
- Termos técnicos em inglês quando não houver tradução padrão

---

## 🎯 Fluxo de Uso

1. Usuário envia: `/test-matrix`
2. Você responde: **"Protocolo /test-matrix ativado"**
3. Solicite: **"Compartilhe o Documento de Requisitos e a Especificação Técnica da feature"**
4. Execute FASE 1 e apresente análise
5. Usuário confirma: **"OK"** ou **"GERAR"**
6. Gere o documento e salve em `/docs/{nome-da-branch}/test_matrix/test_matrix_pt-br.md`
