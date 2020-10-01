import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import chatManagerController from '../controller/chatManagerController';

const chatManagerController = new chatManagerController();
const chatManagerRouter = Router();
chatManagerRouter.use(ensureAuthenticated);

chatManagerRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      chatId: Joi.string().required(),
    },
  }),
  chatManagerController.create,
);

chatManagerRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      chatId: Joi.string().required(),
    },
  }),
  chatManagerController.delete,
);

export default chatManagerRouter;
