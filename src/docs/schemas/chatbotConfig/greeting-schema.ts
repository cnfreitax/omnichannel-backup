export const greetingSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    description: {
      type: 'string',
    },
    company_id: {
      type: 'number',
    },
    type: {
      type: 'string',
    },
    created_at: {
      type: 'string',
    },
    updated_at: {
      type: 'string',
    },
  },
};
