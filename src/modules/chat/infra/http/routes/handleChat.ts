import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import MessageChatController from '../controller/messageChatController';

const messageChatController = new MessageChatController();
const messageChatRouter = Router();

messageChatRouter.post('/', ensureAuthenticated, messageChatController.handle);

export default messageChatRouter;
