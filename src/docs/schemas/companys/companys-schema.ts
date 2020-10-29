export const companysSchema = {
  type: 'array',
  items: {
    $ref: '#schemas/company',
  },
};
