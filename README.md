# UNION OMNICHANNEL

**Ambiente de teste em nuvem ->** **_https://omnichannel-union.herokuapp.com_** (Cujo o webhook está registrado na Code7 atualmente)

## Profiles to tests
adm - adm@test.com
common - comum-14@test.com


# Instalação de dependencias e rodar o sistema

NODEJS - https://nodejs.org/en/ (v12.18.3)
YARN - https://yarnpkg.com/getting-started (v1.22.4)

Com o NODEJS e o YARN instalado rodar dentro da pasta do projeto

`yarn`

Antes de poder rodar o sistema, deve se primeiro criar o banco de dados MySQL

`yarn typeorm migration:run`

Com o banco podemos agora iniciar localmente o sistema

`yarn dev:server`

Podemos criar uma pasta de build para deploy em desenvolvimento de produção

`yarn build`

# ROTAS DISPONÍVEIS

## USER

_POST_ **/api/signup/:access_level ->** Rota para criação de usuário, deve ser passado o nível de acesso.

- PARAMS: access*level (\_Niveis de acesso disponiveis: adm, common*)
- BODY: {
  name: string,
  email: string,
  password: string
  }

_POST_ **/api/signin ->** Rota para fazer login de usuário, retorna um token de autenticação para as rotas seguras.

- BODY: {
  email: string,
  password: string,
  }

_GET_ **/api/profile ->** Retorna o perfil do usuario atual.

- HEADER: Authorization Bearer {token do usuario}

_PUT_ **/api/profile ->** Altera o perfil do usuario atual.

- HEADER: Authorization Bearer {token do usuario}
- BODY: Dados de usuário que devem ser alterados como
  {
  name: string,
  email: string,
  }

_GET_ **/api/users/list-users ->** Retorna uma lista de usuarios cadastrados.

- HEADER: Authorization Bearer {token do usuario}

_GET_ **/api/users/list-users/search ->** Retorna uma lista de usuarios com o nome passado como query.

- HEADER: Authorization Bearer {token do usuario}
- QUERY: name: string

_PUT_ **/api/user-sector/:sector_id ->** Atualiza um usuário como sendo do setor da empresa especificada pelo id.

- PARAMS: access*level (\_Niveis de acesso disponiveis: adm, common*)
- HEADER: Authorization Bearer {token do usuario}
- BODY: {
  user_id: string
  }

   _DELETE_ **/api/logout/:user_id ->** Rota de logout para retirar o usuário atendente de sistema.
- PARAMS: user_id (id do usuário que irá sofrer logout)
- HEADER: Authorization Bearer {token do usuario}

## Company

_POST_ **/api/company ->** Rota para criação de empresa, somente um usuario admin pode criar.

- HEADER: Authorization Bearer {token do usuario adm}
- BODY: {
  name: string,
  cnpj: string,
  email: string,
  codCampaign: string,
  activity: string,
  ddd: string,
  website: string,
  address: string
  }

_GET_ **/api/company ->** Rota para listar todas as empresas.

- HEADER: Authorization Bearer {token do usuario}

_DELETE_ **/api/company/:company_id ->** Rota para remover uma empresa.

- HEADER: Authorization Bearer {token do usuario}
- PARAMS: company_id (Id da empresa que será removida)

_GET_ **/api/company/profile/:company_id ->** Rota para mostrar dados da empresa.

- PARAMS: company_id (Id da empresa que será alterada)
- HEADER: Authorization Bearer {token do usuario}

_PUT_ **/api/company/profile/:company_id ->** Rota para alteração de dados da empresa.

- PARAMS: company_id (Id da empresa que será alterada)
- HEADER: Authorization Bearer {token do usuario adm}
- BODY: Dados de empresa que serão alterados como
  {
  name: string,
  cnpj: string,
  email: string,
  codCampaign: string,
  activity: string,
  ddd: string,
  website: string,
  address: string
  }

## Sector

_POST_ **/api/sector/:company_id ->** Rota para criação de setor de uma empresa.

- PARAMS: company_id (Id da empresa para a criação do setor)
- HEADER: Authorization Bearer {token do usuario}
- BODY: {
  label: string,
  phone: string
  }

_GET_ **/api/sector/list/:company_id ->** Rota para listar todos os setores de uma empresa.

- PARAMS: company_id (Id da empresa para listagem de setores)
- HEADER: Authorization Bearer {token do usuario}

_DELETE_ **/api/sector/:sector_id ->** Rota para remover um setor.

- PARAMS: sector_id (Id do setor que será removido)
- HEADER: Authorization Bearer {token do usuario}

## Chatbot

_POST_ **/api/greeting/:company_id ->** Rota para criação de uma mensagem de boa vindas para uma empresa.

- PARAMS: company_id (Id da empresa que será criada a mensagem)
- BODY: {
  description: string,
  type: greeting
  }

_POST_ **/api/container/:company_id ->** Rota para criação de uma mensagem de chatbot para uma empresa.

- PARAMS: company_id (Id da empresa que será criada a mensagem)
- BODY: {
  description: string,
  type: ContainerType (_Tipos disponiveis: message, media, api, survey, menu, chat, end_chatbot_)
  }

_GET_ **/api/container/ ->** Rota para listar todas as mensagens de uma empresa.

- QUERY: company_id (Id da empresa para listagem de mensagens)

_PUT_ **/api/container/:container_id ->** Rota para atualizar um container com novos dados

- PARAMS: container_id (Id da mensagem que será atualizada)
- BODY: Podem ser atualizados dados como
  {
  to: string, from: string, content: JSON, expects_input: boolean, description: string
  }

_PUT_ **/api/media/:company_id ->** Rota para carregar um arquivo para um container de media

- PARAMS: company_id (Id da empresa que será criada a mensagem)
- MULTIPART FORMDATA {
  file (arquivo que será carregado),
  container_id: string (Id da mensagem de media)
  }

## Chatline

_PUT_ **/api/select ->** Rota para que um usuario seja designado como atendente de um pedido de chat

- HEADER: Authorization Bearer {token do usuario}
- BODY: {
  chat_id: string
  }

_DELETE_ **/api/select ->** Rota para que um usuario termine o seu chat atual

- HEADER: Authorization Bearer {token do usuario}
- BODY: {
  chat_id: string
  }

_GET_ **/api/chat ->** Rota para listar usuários em Chatline de uma empresa específica
- HEADER: Authorization Bearer {token do usuario}
- QUERY: company_id


## UNION MESSAGE

_POST_ **/api/union/response ->** Rota para envio de uma mensagem da union para o cliente pelo whatsapp.

- HEADER: Authorization Bearer {token do usuario}
- BODY: {
  message: string
  }
