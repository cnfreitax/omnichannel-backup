// src/routes/index.ts
// src/routes/index.ts
import { Router } from 'express';
import companiesRouter from '@modules/company/infra/http/routes/company.routes';
import sectorsRouter from '@modules/company/infra/http/routes/sector.routes';
import sessionsRouter from '@modules/company/infra/http/routes/sessions.routes';
import profilesRouter from '@modules/company/infra/http/routes/profiles.routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/sectors', sectorsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profiles', profilesRouter);

routes.get('/', (req, res) => {
  return res.send('hello  world');
});

export default routes;
