import { Router } from 'express';
import userRouter from '@modules/user/infra/http/routes/user.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import profilesRouter from '@modules/user/infra/http/routes/profiles.routes';

const routes = Router();

routes.use('/signup', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profiles', profilesRouter);

export default routes;
