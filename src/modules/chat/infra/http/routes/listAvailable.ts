import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import ensureAuthenticatedAdmUser from '@modules/user/infra/http/middlewares/ensureAuthencticatedAdmUser';
import AvailableUsersController from '../controller/availableUsersController';

const availableUsersController = new AvailableUsersController();
const listUserAvailableRouter = Router();
listUserAvailableRouter.use(ensureAuthenticatedAdmUser);

listUserAvailableRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      company_id: Joi.number(),
    },
  }),
  availableUsersController.index,
);

export default listUserAvailableRouter;
