export const containerPath = {
  post: {
    tags: ['Containers'],
    summary: 'API para criar um Container',
    description: `Essa rota pode ser executada somente por **usuário administrador**, podendo cadastrar containers
      relacionados à uma empresa em especifica.`,
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
            $ref: '#/schemas/containerParams',
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
              $ref: '#/schemas/container',
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
