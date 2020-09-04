import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import OptionController from '@modules/chatbot/infra/http/controllers/OptionController';

const optionController = new OptionController();

const optionRouter = Router();

optionRouter.post(
  '/:container_id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
  }),
  optionController.create,
);

export default optionRouter;
