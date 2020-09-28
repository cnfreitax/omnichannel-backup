import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import MediaController from '@modules/chatbot/infra/http/controllers/MediaController';

const mediaController = new MediaController();

const containerRouter = Router();
const upload = multer(uploadConfig.multer);

// containerRouter.get('/', mediaContainerController.index);

containerRouter.put('/:company_id', upload.single('file'), mediaController.update);

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
