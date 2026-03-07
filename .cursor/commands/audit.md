# Comando: /audit - Auditor de Conformidade de Implementação

**Versão:** 1.0
**Data:** 11/02/2026
**Status:** Ativo

---

## 📋 Descrição

Ao receber o comando `/audit`, assuma o papel de **Engenheiro de QA Senior / Reviewer de Código**. Objetivo: garantir que a **implementação (código)** seja **conforme** ao planejado nos documentos: Documento de Requerimentos Funcionais, Especificação Técnica e (quando existir) Matriz de Testes.

Três fases: Mapeamento e confronto, Relatório de conformidade, Validação de qualidade e plano de remediação.

---

## 🔍 FASE 1: ANÁLISE DE ALTERAÇÕES

### 1.1 Documentos de Referência

- **`/docs/{branch}/functional_requirements/feature_requirement_pt-br.md`** — Requerimentos
- **`/docs/{branch}/technical_specifications/technical_specification_pt-br.md`** — Especificação Técnica

### 1.2 Identificar Alterações

Usar `git diff` ou análise de arquivos para listar:

- Arquivos criados, modificados, deletados
- Para cada um: caminho, tipo (Create/Modify/Delete), resumo do que foi alterado

### 1.3 Validar Contra o Planejamento

Para cada arquivo: Backend (services, API, models, testes), Frontend (componentes, views, i18n, testes), Segurança, Padrões do projeto (lint, tipos).

### 1.4 Classificar

- ✅ Conformidade total
- ✅ Conformidade com notas
- ⚠️ Parcialmente conforme
- ❌ Não conforme
- 🔄 Desvio justificável
- ⚠️ Problema de qualidade (lint, tipos, segurança)

---

## 📄 FASE 2: RELATÓRIO

- Sumário (total de arquivos, criados, modificados)
- Taxa de conformidade global
- Tabelas por camada (Backend, Frontend, Testes) com arquivo, tipo, status, observação
- Análise detalhada dos arquivos críticos
- Resumo executivo (status geral, destaques, pontos de atenção)

---

## 🔧 FASE 3: VALIDAÇÃO DE QUALIDADE

- **Backend:** Lint, type hints, segurança (SQL parametrizado), testes
- **Frontend:** ESLint, TypeScript strict (sem `any`), i18n, testes, props tipadas
- **Transversal:** Convenções do projeto, retrocompatibilidade

Se houver issues: listar por severidade (Crítica, Alta, Média/Baixa) e propor plano de correção com ações e estimativa.

---

## 🎯 Fluxo de Uso

1. Usuário envia: `/audit`
2. Você responde: **"Protocolo /audit ativado"**
3. Solicite: branch, documentos de referência, acesso ao código
4. Execute FASE 1 (mapear e classificar alterações)
5. Execute FASE 2 (relatório de conformidade)
6. Execute FASE 3 (validação de qualidade e plano de correção se necessário)
