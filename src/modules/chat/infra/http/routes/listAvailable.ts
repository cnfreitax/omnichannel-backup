import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import AvailableUsersController from '../controller/availableUsersController';

const availableUsersController = new AvailableUsersController();
const listUserAvailableRouter = Router();
listUserAvailableRouter.use(ensureAuthenticated);

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
