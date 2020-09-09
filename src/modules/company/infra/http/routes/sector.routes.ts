import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import SectorController from '@modules/company/infra/http/controllers/SectorController';
import ensureAuthenticatedAdmUser from '@modules/user/infra/http/middlewares/ensureAuthencticatedAdmUser';

const sectorController = new SectorController();
const sectorRouter = Router();
sectorRouter.use(ensureAuthenticatedAdmUser);
sectorRouter.get('/list/:company_id', sectorController.index);
sectorRouter.post(
  '/:company_id',
  celebrate({
    [Segments.BODY]: {
      label: Joi.string().required(),
      phone: Joi.string().required(),
    },
  }),
  sectorController.create,
);

sectorRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  sectorController.delete,
);

export default sectorRouter;
