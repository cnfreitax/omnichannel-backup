import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import SectorController from '@modules/company/infra/http/controllers/SectorController';

const sectorController = new SectorController();

const sectorRouter = Router();

sectorRouter.get('/', sectorController.index);

sectorRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      company_id: Joi.string().required(),
      label: Joi.string().required(),
      phone: Joi.string().required(),
    },
  }),
  sectorController.create,
);

export default sectorRouter;
