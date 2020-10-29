export const deleteCompanyPath = {
  delete: {
    tags: ['Companys'],
    summary: 'API para deletar uma companhia',
    description: `Essa rota pode ser executada somento por **usuário administrador** para excluir uma companhia da database.`,
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
