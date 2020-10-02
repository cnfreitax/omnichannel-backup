import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import ensureAuthenticatedAdmUser from '@modules/user/infra/http/middlewares/ensureAuthencticatedAdmUser';
import ListChatLineController from '../controller/ListChatLineController';

const listChatController = new ListChatLineController();
const listChatRouter = Router();
listChatRouter.use(ensureAuthenticatedAdmUser);

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
