export const companyParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    cnpj: {
      type: 'string',
    },
    codeCampaign: {
      type: 'string',
    },
    activity: {
      type: 'string',
    },
    ddd: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    website: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
  },
  required: ['name', 'cnpj', 'codeCampaign', 'activity', 'ddd', 'website', 'address', 'email'],
};
