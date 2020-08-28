import { Router } from 'express';
import userRouter from '@modules/user/infra/http/routes/user.routes';
import companiesRouter from '@modules/company/infra/http/routes/company.routes';
import sectorsRouter from '@modules/company/infra/http/routes/sector.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import profilesRouter from '@modules/user/infra/http/routes/profiles.routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/user', userRouter);
routes.use('/sectors', sectorsRouter);
routes.use('/signin', sessionsRouter);
routes.use('/profile', profilesRouter);

export default routes;
