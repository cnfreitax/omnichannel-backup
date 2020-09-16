import { Router } from 'express';
import MessageController from '../Controller/MessageController';

const messageController = new MessageController();
const messageRouter = Router();

messageRouter.post('whatsapp/response', messageController.handle);

export default messageRouter;
