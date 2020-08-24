import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import UsersController from '@modules/users/infra/http/controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
