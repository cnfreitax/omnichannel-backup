import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import CostumerSurveyController from '@modules/chatbot/infra/http/controllers/CostumerSurveyController';

const costumerSurveyController = new CostumerSurveyController();

const surveyRouter = Router();

surveyRouter.post(
  '/:company_id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      type: Joi.string().required(),
      from: Joi.string(),
    },
  }),
  costumerSurveyController.create,
);

export default surveyRouter;
