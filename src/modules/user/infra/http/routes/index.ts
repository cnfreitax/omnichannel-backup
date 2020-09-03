import { Router } from 'express';
import userRouter from './user.routes';
import sessionRouter from './sessions.routes';
import listUser from './listUser.routes';
import profilesRouter from './profiles.routes';
import sectorUserRoute from './assignSector.routes';

const routes = Router();
routes.use('/signup', userRouter);
routes.use('/signin', sessionRouter);
routes.use('/users/list-users', listUser);
routes.use('/profile', profilesRouter);
routes.use('/user-sector', sectorUserRoute);

export default routes;
