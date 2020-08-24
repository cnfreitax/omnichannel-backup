import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AvatarController from '@modules/users/infra/http/controllers/AvatarController';

const avatarController = new AvatarController();
const profileController = new ProfileController();

const profilesRouter = Router();
const upload = multer(uploadConfig.multer);

profilesRouter.use(ensureAuthenticated);

profilesRouter.get('/', profileController.show);
profilesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      oldPassword: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);
profilesRouter.patch('/avatar', upload.single('file'), avatarController.update);

export default profilesRouter;
