import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ChatMenagerController from '../controller/ChatMenagerController';

const chatMenagerController = new ChatMenagerController();
const chatMenagerRouter = Router();
chatMenagerRouter.use(ensureAuthenticated);

chatMenagerRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      chatId: Joi.string().required(),
    },
  }),
  chatMenagerController.create,
);

chatMenagerRouter.delete(
  '/',
  celebrate({
    [Segments.PARAMS]: {
      chatId: Joi.string().required(),
    },
  }),
  chatMenagerController.delete,
);

export default chatMenagerRouter;
