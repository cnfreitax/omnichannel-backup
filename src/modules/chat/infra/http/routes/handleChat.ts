import { Router } from 'express';
import MessageChatController from '../controller/messageChatController';

const messageChatController = new MessageChatController();
const messageChatRouter = Router();

messageChatRouter.post('/', messageChatController.handle);

export default messageChatRouter;
