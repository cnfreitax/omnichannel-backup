import { Router } from 'express';
import greetingRouter from '@modules/chatbot/infra/http/routes/greeting.routes';

const routes = Router();

routes.use('/greeting', greetingRouter);

export default routes;
