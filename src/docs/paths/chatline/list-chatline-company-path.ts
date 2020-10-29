export const listChatlineCompanyPath = {
  get: {
    tags: ['ChatLine'],
    summary: 'API para listar chats em espera de uma comapanhia e setor',
    description: `Essa rota pode ser executada somento por **usuário atendentes**`,
    parameters: [
      {
        in: 'query',
        name: 'companyId',
        required: true,
        schema: {
          type: 'number',
        },
      },
      {
        in: 'query',
        name: 'sectorId',
        required: true,
        schema: {
          type: 'number',
        },
      },
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/chatlines',
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
