import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import CompanyController from '@modules/company/infra/http/controllers/CompanyController';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ListCompaniesController from '@modules/company/infra/http/controllers/ListCompaniesController';

const companyController = new CompanyController();
const listCompaniesController = new ListCompaniesController();
const companyRouter = Router();
companyRouter.use(ensureAuthenticated);
companyRouter.get('/', companyController.index);
companyRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cnpj: Joi.string().required(),
    },
  }),
  companyController.create,
);

companyRouter.get('/all-companies', listCompaniesController.show);

export default companyRouter;
