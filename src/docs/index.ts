import schemas from './schemas';
import paths from './paths';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Omnichannel API',
    description: 'API para serviço de chatbot e chat real time utilizando seriço CODE7 API',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor Principal',
    },
  ],
  tags: [
    {
      name: 'Login',
      description: 'API to login',
    },
  ],
  paths,
  schemas,
};
