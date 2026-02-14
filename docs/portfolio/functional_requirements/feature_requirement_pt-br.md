# Requisitos Funcionais — Portfólio Profissional Full-Stack

## Título
Portfólio Profissional Full-Stack Escalável com API, Banco de Dados e Foco em Impacto para Recrutadores

---

## Descrição Geral

O portfólio é o principal projeto de demonstração do desenvolvedor em nível **Full-Stack Senior**. O objetivo central é impressionar recrutadores e tech leads por meio de uma **arquitetura robusta** (Front-end React + Back-end FastAPI + PostgreSQL), design impecável, experiência de usuário fluida e sensação de profissionalismo em cada detalhe. O site deve ser performático, visualmente impactante, **gerenciar dados de forma dinâmica e escalável** e refletir a senioridade do autor. O conteúdo de projetos e tecnologias é mantido em banco de dados e consumido via API REST, com front-end preparado para estados de carregamento, cache e tratamento de erros de forma profissional.

---

## Requisitos Funcionais

### RF01 — Arquitetura Monorepo e Escalável
- O projeto deve adotar **estrutura de monorepo**, com backend (FastAPI/Python) e frontend (React) centralizados no mesmo repositório.
- A estrutura de diretórios deve ser clara, modular e facilitar crescimento futuro sem retrabalho.
- Componentes, views, estilos, dados, API e modelos de banco devem estar separados por responsabilidade.
- A organização deve permitir que um recrutador navegue o repositório e compreenda rapidamente a arquitetura full-stack.

### RF02 — Design System e Tokens
- Cores, fontes, espaçamentos e demais tokens visuais devem estar centralizados e fáceis de manter.
- Alterações de tema (ex.: dark mode futuro) devem exigir mínimas mudanças na base de código.
- O sistema de design deve ser consistente em toda a aplicação.

### RF03 — Backend: API REST e Banco de Dados
- O backend deve expor uma **API REST** (FastAPI) consumível pelo front-end React.
- Deve existir um **banco de dados PostgreSQL** com modelagem adequada: entidades **projects** e **technologies** com relacionamento **Many-to-Many**.
- Cada projeto deve possuir: **title**, **description**, **repository_url**, **demo_url** (opcional) e **lista de tecnologias** associadas.
- Deve existir endpoint **GET /projects** retornando a lista completa de projetos, com **filtragem por tecnologia** via query params.
- Validação rigorosa de entrada e saída via **Pydantic Schemas**.
- **CORS** configurado para permitir que o front-end React acesse a API com segurança.

### RF04 — Camada de Integração no Front-end
- O front-end deve consumir a API de projetos (não mais arquivo estático).
- Deve ser utilizado **TanStack Query (React Query)** para gerenciamento de requisições, cache e estados de loading/erro.
- Deve existir um **Custom Hook useProjects** que encapsula a chamada à API e opcionalmente filtros (ex.: por tecnologia).
- O carregamento estático do arquivo `projects.ts` deve ser substituído por dados vindos da API.

### RF05 — Experiência de Usuário e Estados de Interface
- Deve ser implementado **Skeleton Loading** no front-end enquanto a API responde, transmitindo profissionalismo e fluidez.
- Projetos podem ser reais (deploy) ou de estudo (GitHub, sem deploy).
- Cada card deve exibir: título, descrição, tags/tecnologias e link (GitHub ou demo, quando existir).
- O sistema deve tratar de forma adequada projetos sem link de demo (ex.: somente repositório).

### RF06 — Internacionalização (i18n)
- Suporte a português (pt-BR) e inglês (en-US).
- A linguagem deve ser escolhida automaticamente com base na preferência do navegador do usuário.
- Todas as strings de interface (títulos, descrições, labels, mensagens) devem vir de arquivos de tradução.
- Dados vindos da API (título/descrição de projetos) podem ser multi-idioma via campos no banco ou chaves i18n no front-end, conforme especificação técnica.

### RF07 — Tratamento de Erros e Resiliência
- **Backend:** Tratamento de exceções **global** e **logs de erro profissionais** (estruturados, com contexto), sem expor detalhes internos ao cliente.
- **Front-end:** Links quebrados ou indisponíveis devem ser tratados de forma elegante.
- Erros de carregamento ou estados vazios não devem prejudicar a experiência nem exibir mensagens técnicas ao usuário.
- A abordagem deve comunicar profissionalismo mesmo em falhas (retry, mensagens amigáveis, fallback UI).

### RF08 — Performance e Experiência
- O site deve carregar rapidamente e manter interações fluidas.
- Uso de cache (TanStack Query) para evitar requisições desnecessárias e melhorar percepção de performance.
- Animações e microinterações devem existir sem prejudicar a performance.
- A experiência deve transmitir cuidado e atenção aos detalhes.

### RF09 — Preparação para Tema Alternativo
- Um único tema será utilizado inicialmente.
- A arquitetura deve permitir adicionar modo escuro (dark mode) no futuro com esforço reduzido, sem refatoração ampla.

### RF10 — Código Limpo e Legível
- O código deve refletir práticas de clean code e boa legibilidade, tanto no backend quanto no frontend.
- Um recrutador que abra o repositório deve conseguir avaliar a qualidade técnica e a maturidade full-stack do desenvolvedor.

---

## Regras de Negócio

### RN01 — Público-alvo
O foco do portfólio são recrutadores e tech leads. Todas as decisões de design, conteúdo, arquitetura e stack devem considerar essa audiência e demonstrar habilidades de nível senior.

### RN02 — Projetos Demonstrativos
O portfólio em si é o projeto principal. Os cards podem incluir projetos de estudo (clones, exercícios) e projetos profissionais, mesmo sem deploy público. O objetivo é demonstrar habilidades full-stack (API, banco, front-end integrado), não apenas produtos em produção.

### RN03 — Conteúdo Dinâmico via API
O conteúdo de projetos e tecnologias é **gerenciado no backend** (PostgreSQL) e servido pela API. O front-end não mantém listas estáticas de projetos no código; consome a API. Apenas o desenvolvedor (ou um fluxo administrativo futuro) altera os dados no banco.

### RN04 — Frequência de Atualização
O conteúdo pode ser alterado com baixa ou média frequência. Novos projetos e tecnologias são adicionados conforme o aprendizado. A arquitetura deve suportar evolução (ex.: painel admin, seeds, migrações) sem quebrar o front-end.

### RN05 — Idioma Automático
A detecção do idioma deve basear-se na configuração do navegador do usuário (ex.: `navigator.language` ou equivalente), priorizando pt-BR ou en-US conforme disponibilidade.

### RN06 — Sem Prioridade para SEO e Analytics (v1)
SEO (meta tags, sitemap, Open Graph) e analytics não são requisitos prioritários na primeira versão. Podem ser considerados em iterações futuras.

### RN07 — Monorepo
Todo o código do portfólio (backend e frontend) deve residir no mesmo repositório, com pastas bem definidas (ex.: `/backend`, `/frontend` ou nome do app front-end), facilitando clone único, documentação única e deploy coordenado.

---

## Pontos de Atenção para Implementação

Este capítulo contém notas técnicas e arquiteturais para subsidiar a fase de especificação técnica. Não descreve implementação detalhada, apenas direcionadores.

### Monorepo e Estrutura
- Raiz do repositório: documentação (`docs/`), configurações compartilhadas (ex.: `.gitignore`, `.env.example`), e subpastas para **backend** (Python/FastAPI) e **frontend** (React).
- Cada parte (backend/frontend) deve poder ser executada e testada de forma independente, com instruções claras no README.

### Backend (FastAPI + PostgreSQL)
- Modelagem: tabelas `projects`, `technologies` e tabela de associação Many-to-Many (ex.: `project_technologies`); ORM SQLAlchemy.
- API: versionamento e convenções REST; documentação automática (OpenAPI/Swagger); CORS restrito à origem do front-end em desenvolvimento e produção.
- Logs e exceções: middleware ou exception handlers globais; logs em nível apropriado (info, error) com contexto (request id, endpoint, stack quando aplicável).

### Front-end (React)
- Camada de dados: TanStack Query para GET /projects (e filtros); hook `useProjects(technology?: string)` (ou similar) encapsulando a chamada.
- UI: Skeleton Loading na seção de projetos enquanto `isLoading`; estados de erro e lista vazia com mensagens amigáveis (i18n).
- Manter design tokens, i18n e separação de componentes/views conforme já especificado; apenas a fonte dos dados dos projetos muda (API em vez de `projects.ts`).

### Performance e UX
- Avaliar code splitting, lazy loading de rotas ou seções pesadas, e otimização de imagens (quando houver).
- Cache e stale-while-revalidate do TanStack Query para reduzir chamadas e melhorar percepção de velocidade.
- Animações de forma parcimoniosa; priorizar fluidez sobre quantidade.

### Tratamento de Erros e Links
- Backend: não retornar stack traces ou mensagens internas ao cliente; responder com códigos HTTP e payloads padronizados (ex.: `{ "detail": "..." }`).
- Front-end: definir comportamento para links externos indisponíveis e para falhas de API (retry, mensagem amigável, estado vazio).

### Internacionalização
- Estruturar arquivos de tradução por idioma (pt-BR, en-US); considerar chaves para mensagens de erro de API e estados vazios.
- Decidir na especificação técnica se títulos/descrições dos projetos vêm da API (multi-idioma no banco) ou se o front-end continua usando chaves i18n com dados mínimos da API (id, slugs, URLs).

### Extensibilidade
- Modelar tokens de forma que tema claro/escuro possa ser trocado via variáveis ou objeto de tema.
- Manter API e banco preparados para evolução (ex.: ordenação, paginação, novos campos) sem quebrar contrato com o front-end.

### Clean Code e Senioridade
- Nomes claros, funções pequenas, separação de responsabilidades em backend e frontend.
- Tipagem forte (TypeScript no front-end; Pydantic e type hints no back-end).
- Comentários apenas quando necessário; código autoexplicativo.
- Consistência de padrões (imports, estrutura de pastas, nomenclatura de endpoints e recursos).

---

**Documento gerado conforme protocolo /requirements.**  
**Próxima fase sugerida:** Especificação Técnica (techspec) com decisões arquiteturais detalhadas, esquema de banco, endpoints da API e padrões de implementação no monorepo.
