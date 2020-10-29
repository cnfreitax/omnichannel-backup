export const greetingPath = {
  post: {
    tags: ['Chatbot Config'],
    summary: 'API para criar mensagem de recepção',
    description: `Essa rota pode ser executada somento por **usuário administrador**. A mensagem salva será
      exibida aos usuários clientes quando entrarem em contato via WhatssApp
    `,
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
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/greetingParams',
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
              $ref: '#/schemas/greeting',
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
