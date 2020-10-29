export const containerSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    from: {
      type: 'number',
    },
    to: {
      type: 'number',
    },
    expects_input: {
      type: 'boolean',
    },
    content: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    company_id: {
      type: 'number',
    },
    created_at: {
      type: 'string',
    },
    updated_at: {
      type: 'string',
    },
  },
};
