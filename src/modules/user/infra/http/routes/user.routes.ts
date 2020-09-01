import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import UserController from '@modules/user/infra/http/controllers/UserController';

const userController = new UserController();
const userRouter = Router();

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

userRouter.get('/', userController.index);

export default userRouter;
