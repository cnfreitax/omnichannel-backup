import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import EndOfChatbotController from '@modules/chatbot/infra/http/controllers/EndOfChatbotController';

const endOfChatbotController = new EndOfChatbotController();

const endChatbotRouter = Router();

endChatbotRouter.post(
  '/:company_id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      type: Joi.string().required(),
      from: Joi.string(),
    },
  }),
  endOfChatbotController.create,
);

export default endChatbotRouter;
