import { Router } from 'express';
import containerRouter from '@modules/chatbot/infra/http/routes/container.routes';
import greetingRouter from '@modules/chatbot/infra/http/routes/greeting.routes';
import surveyRouter from '@modules/chatbot/infra/http/routes/survey.routes';
import endChabotRouter from '@modules/chatbot/infra/http/routes/endChatbot.routes';
import optionRouter from './option.routes';

const routes = Router();

routes.use('/container', containerRouter);
routes.use('/greeting', greetingRouter);
routes.use('/survey', surveyRouter);
routes.use('/end-chatbot', endChabotRouter);
routes.use('/option', optionRouter);

export default routes;
