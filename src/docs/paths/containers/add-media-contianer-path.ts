export const addMediaToContainerPath = {
  post: {
    tags: ['Containers'],
    summary: 'API para upload de media para um Container',
    description: `Essa rota pode ser executada somente por **usuário administrador**.`,
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
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            $ref: '#/schemas/uploadMediaContainerParams',
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
