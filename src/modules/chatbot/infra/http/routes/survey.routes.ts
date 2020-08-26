import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import CostumerSurveyController from '@modules/chatbot/infra/http/controllers/CostumerSurveyController';

const costumerSurveyController = new CostumerSurveyController();

const surveyRouter = Router();

surveyRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      text: Joi.string().required(),
      type: Joi.string().required(),
      parent_id: Joi.string().optional(),
    },
  }),
  costumerSurveyController.create,
);

export default surveyRouter;
