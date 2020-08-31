import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import CompanyController from '@modules/company/infra/http/controllers/CompanyController';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';

const companyController = new CompanyController();
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

export default companyRouter;
