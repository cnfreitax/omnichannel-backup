import { Router } from 'express';
import handleChat from './handleChat';
import listUserAvailableRouter from './listAvailable';
import selectChatRouter from './selectChat.routes';

const routes = Router();
routes.use('/available', listUserAvailableRouter);
routes.use('/union/response', handleChat);
routes.use('/select', selectChatRouter);

export default routes;
