import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const resetPasswordController = new ResetPasswordController();

const passwordRouter = Router();

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
