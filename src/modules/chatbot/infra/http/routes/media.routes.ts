import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';
import MediaContainerController from '@modules/chatbot/infra/http/controllers/MediaContainerController';

const mediaContainerController = new MediaContainerController();

const containerRouter = Router();
const upload = multer(uploadConfig.multer);

// containerRouter.get('/', mediaContainerController.index);

containerRouter.post(
  '/:company_id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      type: Joi.string().required(),
      content: Joi.object(),
      from: Joi.string(),
      to: Joi.string(),
      expects_input: Joi.boolean(),
    },
  }),
  upload.single('file'),
  mediaContainerController.create,
);

// containerRouter.put(
//   '/:container_id',
//   celebrate({
//     [Segments.BODY]: {
//       description: Joi.string(),
//       content: Joi.object(),
//       from: Joi.string(),
//       to: Joi.string(),
//       expects_input: Joi.boolean(),
//     },
//   }),
//   upload.single('file'),
//   mediaContainerController.update,
// );

export default containerRouter;
