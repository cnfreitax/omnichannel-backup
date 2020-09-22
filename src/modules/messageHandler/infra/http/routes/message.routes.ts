import { Router } from 'express';
import MessageController from '../Controller/MessageController';

const messageController = new MessageController();
const messageRouter = Router();

messageRouter.post('/whatsapp/response', messageController.handle);
messageRouter.post('/whatsapp/status', messageController.status);

export default messageRouter;
