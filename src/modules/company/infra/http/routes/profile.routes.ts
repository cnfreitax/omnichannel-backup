import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import ProfileController from '@modules/company/infra/http/controllers/ProfileController';
import ensureAuthenticatedAdmUser from '@modules/user/infra/http/middlewares/ensureAuthencticatedAdmUser';

const profileController = new ProfileController();
const profilesRouter = Router();
profilesRouter.use(ensureAuthenticatedAdmUser);

profilesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  profileController.show,
);

profilesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      address: Joi.string(),
      website: Joi.string(),
      activity: Joi.string(),
      ddd: Joi.string(),
    },
  }),
  profileController.update,
);

export default profilesRouter;
