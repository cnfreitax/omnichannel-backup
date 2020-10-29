export const updateContainerPath = {
  put: {
    tags: ['Containers'],
    summary: 'API para editar informações de um container',
    description: `Essa rota pode ser executada somente por **usuário administrador**, podendo editar informações do perfil de um container`,
    parameters: [
      {
        in: 'path',
        name: 'containerId',
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
