import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import CompanyController from '@modules/company/infra/http/controllers/CompanyController';
import ListCompaniesController from '@modules/company/infra/http/controllers/ListCompaniesController';
import ensureAuthenticatedAdmUser from '@modules/user/infra/http/middlewares/ensureAuthencticatedAdmUser';

const companyController = new CompanyController();
const listCompaniesController = new ListCompaniesController();
const companyRouter = Router();
companyRouter.use(ensureAuthenticatedAdmUser);
companyRouter.get('/', companyController.index);
companyRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cnpj: Joi.string().required(),
      email: Joi.string().email().required(),
      address: Joi.string().required(),
      logo: Joi.string(),
      webhook_status: Joi.string(),
      webhook_response: Joi.string(),
      activity: Joi.string().required(),
      ddd: Joi.string().required(),
      website: Joi.string().required(),
    },
  }),
  companyController.create,
);

companyRouter.get('/all-companies', listCompaniesController.show);

export default companyRouter;
