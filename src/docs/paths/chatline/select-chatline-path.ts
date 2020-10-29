export const selectChatlinePath = {
  put: {
    tags: ['ChatLine'],
    summary: 'API para um atendente iniciar um contato de chat com cliente',
    description: `Essa rota pode ser executada somento por **usuário atendentes**, podendo entrar em
    contado de menssagem com o cliente que está na fila de espera
    `,
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/selectChatlineParams',
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
              $ref: '#/schemas/chatline',
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
  delete: {
    tags: ['ChatLine'],
    summary: 'API para um atendente finalizar um contato de chat com cliente',
    description: `Essa rota pode ser executada somento por **usuário atendentes**. Finalisa e retorna mensagem final para o cliente`,
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/endChatlineParams',
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
              $ref: '#/schemas/chatline',
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
