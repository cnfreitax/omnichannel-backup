import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import UserController from '@modules/user/infra/http/controllers/UserController';

const userController = new UserController();
const userRouter = Router();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  userController.create,
);

export default userRouter;
