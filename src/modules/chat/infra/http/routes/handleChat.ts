import { Router } from 'express';
import MessageChatController from '../controller/messageChatController';

const messageChatController = new MessageChatController();
const messageChatRouter = Router();

messageChatRouter.post('/union/response', messageChatController.handle);

export default messageChatRouter;
