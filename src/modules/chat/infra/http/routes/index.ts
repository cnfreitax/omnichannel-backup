import { Router } from 'express';
import handleChat from './handleChat';
import listUserAvailableRouter from './listAvailable';
import listlistChatRouter from './listChatsFromCompany';
import selectChatRouter from './selectChat.routes';

const routes = Router();
routes.use('/available', listUserAvailableRouter);
routes.use('/chat', listlistChatRouter);
routes.use('/union/response', handleChat);
routes.use('/select', selectChatRouter);

export default routes;
