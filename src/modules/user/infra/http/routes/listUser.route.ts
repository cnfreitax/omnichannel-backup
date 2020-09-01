import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import UserController from '@modules/user/infra/http/controllers/UserController';

const userController = new UserController();
const listUserRoute = Router();

listUserRoute.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      sector_id: Joi.number(),
      company_id: Joi.number(),
    },
  }),
  userController.index,
);

export default listUserRoute;
