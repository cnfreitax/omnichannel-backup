import schemas from './schemas';
import paths from './paths';
import components from './components';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Omnichannel API',
    description: `API para serviço de chatbot e chat real time utilizando seriço CODE7 API. A seguinte
      documentação demonstra todo o fluxo de usuário da aplicação, tanto por parte de administrador quanto
      atendente.
      **Os testes devem serem feitos com usuário cadastrados no banco de dados**.
    `,
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
      name: 'Companys',
      description: `API's para lidar com casos de uso de companhias`,
    },
    {
      name: 'Chatbot Config',
      description: `API's configurar mensagem de entrada`,
    },
    {
      name: 'Containers',
      description: `API's para lidar Containers. Containers são mensagem que serão entregues para o
      cliente por serviço de ChatBot
      `,
    },
    {
      name: 'ChatLine',
      description: `API's para lidar com usuários em fila de espera para Chat real-time com atendents.`,
    },
  ],
  paths,
  schemas,
  components,
};
