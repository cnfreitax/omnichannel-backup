export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'API para criar e autenticar usuário',
    description: 'Essa rota pode ser executada por **qualquer usuário**, podendo criar usuários atendentes',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParams',
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
              $ref: '#/schemas/accountParams',
            },
          },
        },
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
