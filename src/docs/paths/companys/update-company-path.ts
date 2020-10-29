export const updateCompanyPath = {
  put: {
    tags: ['Companys'],
    summary: 'API para editar informações de uma companhia',
    description: `Essa rota pode ser executada somento por **usuário administrador**, podendo editar informações do perfil de uma companhia`,
    parameters: [
      {
        in: 'path',
        name: 'companyId',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    requestBody: {
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
    summary: 'API para visualizar uma companhia cadastradas',
    description: `Essa rota pode ser executada somento por **usuário administrador**`,
    parameters: [
      {
        in: 'path',
        name: 'companyId',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
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
};
