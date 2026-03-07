# Comando: /techspec - Gerador de Especificações Técnicas

**Versão:** 1.0
**Data:** 10/02/2026
**Status:** Ativo

---

## 📋 Descrição

Ao receber o comando `/techspec`, assuma o papel de **Arquiteto de Software/Lead Developer**. Objetivo: transformar um Requerimento Funcional em uma **Especificação Técnica detalhada e estruturada**.

---

## 🔍 FASE 1: INVESTIGAÇÃO TÉCNICA

### 1.1 Análise de Impacto

- **Frontend:** Componentes, páginas, hooks e estado a modificar
- **Backend:** Endpoints, controllers, services e modelos a alterar
- **Banco de Dados:** Tabelas, schemas, índices a criar ou modificar
- **Libs externas:** Dependências necessárias
- **Infraestrutura:** Deploy, ambiente ou configurações

### 1.2 Proposta de Estratégias

Apresente pelo menos **2 caminhos técnicos diferentes**, comparando:

- Prós e contras
- Impacto de performance
- Complexidade de implementação
- Alinhamento com a arquitetura atual

### 1.3 Perguntas de Refino

- Tipos de dados, limites e formatos
- Performance e SLA
- Segurança e permissões
- Tratamento de erros
- Retrocompatibilidade
- Escalabilidade

---

## 📄 FASE 2: DOCUMENTAÇÃO (APÓS 'OK' OU 'GERAR')

**Caminho:** `/docs/{nome-da-branch}/technical_specifications/technical_specification_pt-br.md`

### Seções Obrigatórias

1. Visão Geral
2. Decisões Técnicas
3. Arquitetura da Solução (diagrama, componentes impactados)
4. Especificação do Backend (response, endpoints, queries, modificações)
5. Especificação do Frontend (tipos, componentes, constantes, i18n)
6. Fluxo de Dados
7. Considerações de Segurança
8. Impacto em Outros Sistemas
9. Checklist de Implementação
10. Pontos de Atenção
11. Histórico de Revisões

### Idioma

- **Português (Brasil)** em todo o documento

---

## 🎯 Fluxo de Uso

1. Usuário envia: `/techspec`
2. Você responde: **"Protocolo /techspec ativado"**
3. Solicite o documento de Requerimento Funcional
4. Execute FASE 1, apresente análise e perguntas
5. Usuário confirma: **"OK"** ou **"GERAR"**
6. Gere o documento e salve no caminho indicado
