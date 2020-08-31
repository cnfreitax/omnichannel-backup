import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import SectorController from '@modules/company/infra/http/controllers/SectorController';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';

const sectorController = new SectorController();
const sectorRouter = Router();
sectorRouter.use(ensureAuthenticated);
sectorRouter.get('/', sectorController.index);
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

export default sectorRouter;
