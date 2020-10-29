export const greetingParamsSchema = {
  type: 'object',
  properties: {
    description: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    required: ['description', 'type'],
  },
};
