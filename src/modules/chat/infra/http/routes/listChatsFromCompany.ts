import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ListChatLineController from '../controller/ListChatLineController';

const listChatController = new ListChatLineController();
const listChatRouter = Router();
listChatRouter.use(ensureAuthenticated);

listChatRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      company_id: Joi.number(),
    },
  }),
  listChatController.index,
);

export default listChatRouter;
