import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import UserSectorController from '@modules/user/infra/http/controllers/UserSectorController';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';

const userSectorController = new UserSectorController();
const sectorUserRoute = Router();
sectorUserRoute.use(ensureAuthenticated);

sectorUserRoute.get('/sec', userSectorController.update);
sectorUserRoute.put(
  '/:user_id',
  celebrate({
    [Segments.BODY]: {
      sector_id: Joi.number().required(),
    },
  }),
  userSectorController.update,
);

export default sectorUserRoute;
