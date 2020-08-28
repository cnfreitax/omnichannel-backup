import { Router } from 'express';
import userRouter from '@modules/user/infra/http/routes/user.routes';
import companiesRouter from '@modules/company/infra/http/routes/company.routes';
import sectorsRouter from '@modules/company/infra/http/routes/sector.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import profilesRouter from '@modules/user/infra/http/routes/profiles.routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/signup', userRouter);
routes.use('/sectors', sectorsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profiles', profilesRouter);

export default routes;
