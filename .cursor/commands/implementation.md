# implementation

Você deve realizar a implementação técnica completa da funcionalidade descrita nos documentos de referência: @docs/[FEATURE]/functional_requirements/documento-requerimento.md e @docs/[FEATURE]/technical_specifications/especificação-tecnica.md. Estude a documentação a fundo e mantenha-se estritamente dentro dos limites técnicos, padrões de projeto e arquitetura de pastas estabelecidos.”
Diretrizes de Implementação:
1. Backend (Python/Flask):
Lógica de Serviço: Implemente as regras de negócio nos arquivos de serviço pertinentes, garantindo a modularização e separação de responsabilidades.
Camada de Dados: Realize as operações de banco de dados utilizando exclusivamente as funções utilitárias do projeto (como execute_raw_query), aplicando parametrização para garantir a segurança.
Contratos e Validação de API: Atualize ou crie os endpoints no Flask. É mandatório que o schema.py valide rigorosamente os tipos de dados e campos obrigatórios, retornando os códigos HTTP corretos (ex: 422 para erros de contrato, 403 para permissões).
2. Frontend (React/TypeScript):
Componentização e Views: Desenvolva a interface utilizando os componentes internos e respeitando a hierarquia de visualização proposta na especificação técnica.
Internacionalização (i18n): Todas as strings de interface (labels, placeholders, mensagens) devem utilizar o sistema de tradução do projeto, garantindo suporte completo para pt_BR e en_US.
Tratamento de Dados: Implemente a lógica de exibição garantindo que estados de erro ou valores nulos sejam tratados com as constantes de fallback padrão do sistema (ex: DASHBOARD_NULLISH_TEXT).
Restrições e Padrões:
Fidelidade Técnica: Siga estritamente o que foi definido na Especificação Técnica. Não adicione comportamentos, persistências ou integrações que não estejam descritos.Segurança: É proibida a concatenação de strings em consultas SQL. Use sempre os placeholders fornecidos pela camada de dados.Clean Code: Mantenha o estilo de código consistente com o restante do repositório, respeitando tipagem TypeScript e as convenções de Python/Flask.Tarefa: Inicie a implementação passo a passo. Liste primeiro todos os arquivos que serão criados ou modificados e, em seguida, apresente o código completo para a camada de Backend e, posteriormente, a camada de Frontend.

