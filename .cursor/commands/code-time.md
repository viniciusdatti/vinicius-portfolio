# Comando: /code-time - Gerador de Implementação Técnica

**Versão:** 1.0
**Data:** 11/02/2026
**Status:** Ativo

---

## 📋 Descrição

Ao receber o comando `/code-time`, assuma o papel de **Desenvolvedor Senior / Arquiteto de Implementação**. Objetivo: realizar a **implementação técnica completa** da funcionalidade descrita no **Documento de Requerimentos Funcionais** e na **Especificação Técnica**.

Fluxo: Análise e planejamento → Listagem de arquivos → Implementação Backend → Implementação Frontend.

---

## 🔍 FASE 1: ANÁLISE E PLANEJAMENTO

- Ler completamente Requerimentos e Especificação Técnica
- Mapear impacto: Backend (services, models, endpoints, utils), Frontend (componentes, pages, hooks, i18n), Testes
- Validar conformidade com padrões do projeto (tipagem, lint, i18n, convenções)
- Verificar dependências necessárias

---

## 📄 FASE 2: LISTAGEM DE ARQUIVOS

Antes de codificar, listar **todos** os arquivos a criar/modificar, agrupados por camada:

- **Backend:** services, models, APIs, testes (test_run, provision, validate quando aplicável)
- **Frontend:** components (tsx, style.ts, types.ts, index.ts), hooks, pages, i18n (en_US, pt_BR), testes (*.test.tsx)

Caminhos de referência: `backend/` para backend, `interfaces/web/src/` para frontend.

---

## 💻 FASE 3: IMPLEMENTAÇÃO BACKEND

(Quando o projeto tiver backend.)

- Models e utilitários
- Regras de negócio (services)
- Schemas de API
- Endpoints (rotas, autorização, tratamento de erros)
- Testes unitários e de API
- **Segurança:** Sem concatenação de strings em SQL; usar parametrização

---

## 🎨 FASE 4: IMPLEMENTAÇÃO FRONTEND

- Tipos/interfaces TypeScript (arquivos `.types.ts`)
- Componentes React (styled-components, sem estilos inline)
- i18n: todas as strings via react-i18next; chaves em pt_BR e en_US
- Tratamento de estados (loading, erro, sucesso)
- Testes: Jest + @testing-library/react; wrapper com ThemeProvider, Router conforme padrão do projeto; assertions precisas (sem toBeGreaterThan(0))

---

## 🎯 Diretrizes

- Seguir **estritamente** a Especificação Técnica
- TypeScript strict, sem `any`; Python com type hints
- Código conforme convenções e regras do projeto (import sections, enums, initialState, etc.)
- Ao final: lint e tipos sem erros

---

## 🎯 Fluxo de Uso

1. Usuário envia: `/code-time`
2. Você responde: **"Protocolo /code-time ativado"**
3. Solicite Requerimentos e Especificação Técnica
4. Execute FASE 1 e FASE 2; apresente mapa de impacto
5. Após validação do usuário: FASE 3 (backend) e FASE 4 (frontend)
6. Forneça resumo final com arquivos criados/modificados
