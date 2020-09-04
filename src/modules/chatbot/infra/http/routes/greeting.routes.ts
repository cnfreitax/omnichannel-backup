import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import GreetingController from '@modules/chatbot/infra/http/controllers/GreetingController';

const greetingController = new GreetingController();

const greetingMessageRouter = Router();

greetingMessageRouter.post(
  '/:company_id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      type: Joi.string().required(),
    },
  }),
  greetingController.create,
);

export default greetingMessageRouter;
