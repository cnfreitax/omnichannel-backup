import { Router } from 'express';
import companiesRouter from '@modules/user/infra/http/routes/company.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import profilesRouter from '@modules/user/infra/http/routes/profiles.routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profiles', profilesRouter);

routes.get('/', (req, res) => {
  return res.send('hello  world');
});

export default routes;
