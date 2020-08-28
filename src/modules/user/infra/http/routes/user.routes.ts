import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import UserController from '@modules/user/infra/http/controllers/UserController';

const userController = new UserController();
const userRouter = Router();

userRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      access_level: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

export default userRouter;
