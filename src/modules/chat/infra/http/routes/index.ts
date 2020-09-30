import { Router } from 'express';
import listUserAvailableRouter from './listAvailable';
import selectChatRouter from './selectChat.routes';

const routes = Router();
routes.use('/available', listUserAvailableRouter);
routes.use('/select', selectChatRouter);

export default routes;
