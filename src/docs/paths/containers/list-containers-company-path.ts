export const listContainersPath = {
  get: {
    tags: ['Containers'],
    summary: 'API para listar todos os container de uma empresa',
    description: `Essa rota pode ser executada somente por **usuário administrador**`,
    parameters: [
      {
        in: 'query',
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
              $ref: '#/schemas/containers',
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
