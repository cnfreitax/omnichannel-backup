import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import UserController from '@modules/user/infra/http/controllers/UserController';
import ensureAuthenticatedAdmUser from '../middlewares/ensureAuthencticatedAdmUser';

const userController = new UserController();
const listUserRouter = Router();
listUserRouter.use(ensureAuthenticatedAdmUser);

listUserRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      sector_id: Joi.number(),
      company_id: Joi.number(),
    },
  }),
  userController.index,
);

listUserRouter.get(
  '/search',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      email: Joi.string(),
    },
  }),
  userController.show,
);

export default listUserRouter;
