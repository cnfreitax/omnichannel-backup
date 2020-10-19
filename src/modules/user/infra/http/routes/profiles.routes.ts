import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import ProfileController from '@modules/user/infra/http/controllers/ProfileController';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ensureAuthenticatedAdmUser from '../middlewares/ensureAuthencticatedAdmUser';

const profileController = new ProfileController();

const profilesRouter = Router();

profilesRouter.use(ensureAuthenticated);

profilesRouter.get('/', profileController.show);
profilesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      sector: Joi.number(),
      oldPassword: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

profilesRouter.put(
  '/:id',
  ensureAuthenticatedAdmUser,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      sector: Joi.number(),
      oldPassword: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profilesRouter;
