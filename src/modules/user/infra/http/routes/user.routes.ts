import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import UserController from '@modules/user/infra/http/controllers/UserController';
import ensureAuthenticatedAdmUser from '../middlewares/ensureAuthencticatedAdmUser';

const userController = new UserController();
const userRouter = Router();
userRouter.use(ensureAuthenticatedAdmUser);

userRouter.post(
  '/:access_level',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

export default userRouter;
