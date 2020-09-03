import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import UpdateOptionController from '@modules/chatbot/infra/http/controllers/UpdateOptionController';
import OptionController from '@modules/chatbot/infra/http/controllers/OptionController';

const updateOptionController = new UpdateOptionController();
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

optionRouter.put(
  '/:optionId',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string(),
      to: Joi.string(),
    },
  }),
  updateOptionController.update,
);

export default optionRouter;
