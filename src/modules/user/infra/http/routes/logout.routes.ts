import { Router } from 'express';
import LogoutUserController from '@modules/user/infra/http/controllers/LogoutController';

const logoutRouter = Router();
const logoutUser = new LogoutUserController();

logoutRouter.delete('/:user_id', logoutUser.delete);

export default logoutRouter;
