export const sendMessageChatPath = {
  post: {
    tags: ['ChatLine'],
    summary: 'API para um atendente enviar mensagem ao chat com que eles está logado',
    description: `Essa rota pode ser executada somento por **usuário atendentes**. O Atendente precisa ter
      iniciado o atendimento através da rota de select chat.
    `,
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/sendMessageParams',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Sucesso',
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
