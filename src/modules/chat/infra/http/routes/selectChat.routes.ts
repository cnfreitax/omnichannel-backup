import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import SelectChatController from '../controller/SelectChatController';

const selectChatController = new SelectChatController();
const selectChatRouter = Router();
selectChatRouter.use(ensureAuthenticated);

selectChatRouter.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      chatId: Joi.string().required(),
    },
  }),
  selectChatController.create,
);

export default selectChatRouter;
