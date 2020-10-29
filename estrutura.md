 __**src**
|
|__**types** <- Definições de tipos para o Typescrypt
|
|__**config** <- Arquivos de configurações genéricas
|
|__**docs** <- Contém a documentação da aplicação
|
|__**models** <- Contém os módulos da aplicação, separando os casos de uso
|   |
|   |__**model-example** <- Folder específico de um serviço (user, para exemplo)
|   |   |
|   |   |__**dtos** <- Contém interfaces de data transfers objects
|   |   |
|   |   |__**infra** <- Configurações de infraestrutura (rotas, controllers, serviços de ORM)
|   |   |    |
|   |   |    |__**http** <- Isolamente de configurações de Rotas e Controllers do módulo
|   |   |    |    |
|   |   |    |    |__controllers <- Arquivos de controllers dos módulos
|   |   |    |    |
|   |   |    |    |__routes <- Rotas do módulo
|   |   |    |    |
|   |   |    |    |__middlewares <- Arquivos para serem usados como middlewares tanto nessa ou em outros
|   |   |    |    |
|   |   |    |__**typeorm** <- Configuração de repositórios e entidades desse módulo.
|   |   |    |    |
|   |   |    |    |__**entities** <- Contém arquivos de configuração de modelo para objetos do module
|   |   |    |    |
|   |   |    |    |__**repositories** <- Contém a infraestrutura das querys utilizadas no module
|   |   |    |
|   |   |    |
|   |   |__**repositories** <- Contém configuração de types/interfaces para serem usadas no modulo
|   |   |    |    |
|   |   |    |    |__**fakes** <- Arquivos para serem utilizados em testes implementanto interfaces
|   |   |    |
|   |   |__**services** <- Comportamentos do módulo inmplementando as interfaces e o ORM dividido pro classes
|   |   |
|   |__**shared** <- Serviços compartilhados por todos os módulos da aplicação.
|   |   |
|   |   |__**container** <- Local de configuração global para Injeção de Dependências
|   |   |   |
|   |   |   |__**providers** <- Arquivos de provedores de serviços externos
|   |   |   |   |
|   |   |   |   |__**provider-example**
|   |   |   |   |     |
|   |   |   |   |     |__**dtos** <- Contém interfaces de data transfers objects
|   |   |   |   |     |
|   |   |   |   |     |__**implementations** <- Implementação do caso de uso, chamando direto o serviço
|   |   |   |   |     |
|   |   |   |   |     |__**models** <- Interfaces de casos de uso para serem implementadas
|   |   |   |   |
|   |   |   |__**erros** <- Arquivo de configração geraç de classe de erro da aplicação
|   |   |   |   |
|   |   |   |__**infra** <- Confiração do server e serviço de database
|   |   |   |   |
|   |   |   |   |__**http** <- Server config
|   |   |   |   |   |
|   |   |   |   |   |__**config** <- Configuração do APP, Swagger e Setup de Middlewares
|   |   |   |   |   |
|   |   |   |   |   |__**middlewares** <- Configração de Middlewares
|   |   |   |   |   |
|   |   |   |   |   |__**routes** <- Exportação de rotas globais da aplicação
|   |   |   |   |   |
|   |   |   |   |   |__**server** <- Entrada da aplicação
|   |   |   |   |   |
|   |   |   |   |   |__**typeorm** <- Configuração de banco de dados
|   |   |   |   |   |   |
|   |   |   |   |   |   |__**migrations** <- Armazenamento de migrations para DB
|   |   |   |   |   |   |
|   |   |   |   |   |   |__**index.js** <- Arquivo para conectar com o ORMCONFIG
|   |   |   |   |   |
|   |   |   |   |   |__**utils** <- Funções reutilizaveis entre os módulos
|___|___|___|___|___|____________________________________________________________________________________
