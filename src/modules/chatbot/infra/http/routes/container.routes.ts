import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import ContainerController from '@modules/chatbot/infra/http/controllers/ContainerController';

const containerController = new ContainerController();

const containerRouter = Router();

containerRouter.post(
  '/:company_id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      type: Joi.string().required(),
      content: Joi.object(),
      from: Joi.string(),
      to: Joi.string(),
    },
  }),
  containerController.create,
);

export default containerRouter;
