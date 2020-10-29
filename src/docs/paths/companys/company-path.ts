export const companyPath = {
  post: {
    tags: ['Companys'],
    summary: 'API para criar uma companhia',
    description: `Essa rota pode ser executada somento por **usuário administrador**, podendo cadastrar companhias.
      O campo **codCampaign** deve ser fornecido através dos serviços da Code7, é esencial para o para o funcionamento
      de chat e chatBot.
    `,
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/companyParams',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/company',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  get: {
    tags: ['Companys'],
    summary: 'API para listar companhias cadastradas',
    description: `Essa rota pode ser executada somento por **usuário administrador**`,
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/companys',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
