import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import CompanyController from '@modules/company/infra/http/controllers/CompanyController';

const companyController = new CompanyController();

const companyRouter = Router();

companyRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  companyController.create,
);

export default companyRouter;
