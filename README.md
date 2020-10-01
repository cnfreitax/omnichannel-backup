# UNION OMNICHANNEL

**Ambiente de teste ->** **_https://omnichannel-union.herokuapp.com_**

# ROTAS DISPONÍVEIS

## USER

_POST_ **/api/signup/:access_level ->** Rota para criação de usuário, deve ser passado o nível de acesso.

- PARAMS: access_level (_Niveis de acesso disponiveis: adm, common_)
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

- PARAMS: access_level (_Niveis de acesso disponiveis: adm, common_)
- HEADER: Authorization Bearer {token do usuario}
- BODY: {
  user_id: string
  }

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

