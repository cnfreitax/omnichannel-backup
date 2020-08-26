import { Router } from 'express';
import greetingRouter from '@modules/chatbot/infra/http/routes/greeting.routes';
import surveyRouter from '@modules/chatbot/infra/http/routes/survey.routes';
import endChabotRouter from '@modules/chatbot/infra/http/routes/endChatbot.routes';

const routes = Router();

routes.use('/greeting', greetingRouter);
routes.use('/survey', surveyRouter);
routes.use('/end-chatbot', endChabotRouter);

export default routes;
