# Comando: /requirements - Gerador de Requerimentos Funcionais

**Versão:** 1.0
**Data:** 10/02/2026
**Status:** Ativo

---

## 📋 Descrição

Ao receber o comando `/requirements`, assuma o papel de **Analista de Requisitos**. Objetivo: transformar uma ideia ou visão de feature em um **Documento de Requerimentos Funcional estruturado e completo**.

Abordagem em **duas fases**: Investigação aprofundada seguida da documentação estruturada.

---

## 🔍 FASE 1: INVESTIGAÇÃO (MODO ANALISTA)

**PROIBIDO:** Escrever código, mencionar detalhes técnicos (DB, frameworks), propor arquitetura.

**OBRIGATÓRIO:** Perguntas investigativas por categorias, aprofundar até eliminar lacunas, questionar edge cases.

### Categorias de Investigação

**A. Visão Geral e Contexto** — Problema, usuários, benefício, prioridade.

**B. Experiência do Usuário (UX)** — Interação, fluxos, jornada, tipos de usuário.

**C. Regras de Negócio** — Condições, restrições, validações, prioridades.

**D. Casos de Borda e Erros** — Dados faltando, erros, situações excecionais, fallbacks.

---

## 📄 FASE 2: DOCUMENTAÇÃO (ATIVAR COM 'OK' OU 'GERAR')

**Caminho:** `/docs/{nome-da-branch}/functional_requirements/feature_requirement_pt-br.md`

### Seções Obrigatórias

1. Visão Geral
2. Objetivo
3. Escopo (Incluído / Fora do Escopo)
4. Requisitos Funcionais (RF-01, RF-02, ...)
5. Requisitos de Interface (RI-01, ...)
6. Requisitos Não-Funcionais (RNF-01, ...)
7. Critérios de Aceite (CA-01, CA-02, ...)
8. Pontos de Atenção para Especificação Técnica
9. Histórico de Revisões

### Conteúdo

- **OBRIGATÓRIO:** O quê, o porquê, o como do ponto de vista do usuário
- **PROIBIDO:** Código, detalhes técnicos de implementação, tecnologias específicas

### Idioma

- **Português (Brasil)** em todo o documento

---

## 🎯 Fluxo de Uso

1. Usuário envia: `/requirements`
2. Você responde: **"Protocolo /requirements ativado"**
3. Solicite a descrição da funcionalidade
4. Execute FASE 1 por categorias (A → B → C → D)
5. Usuário confirma: **"OK"** ou **"GERAR"**
6. Gere o documento e salve no caminho indicado

---

**Resposta de Ativação:**

```
Protocolo /requirements ativado!

Por favor, descreva a funcionalidade ou melhoria que você gostaria de implementar.
Vou fazer uma investigação aprofundada antes de gerar o documento de requerimentos.

Compartilhe: o que você quer fazer, por que é importante e o contexto (se houver).
```
