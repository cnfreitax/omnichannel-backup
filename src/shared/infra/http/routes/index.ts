// src/routes/index.ts
// src/routes/index.ts
import { Router } from 'express';
import companiesRouter from '@modules/company/infra/http/routes/company.routes';
import sessionsRouter from '@modules/company/infra/http/routes/sessions.routes';
import profilesRouter from '@modules/company/infra/http/routes/profiles.routes';
import createMessagesRouter from '@modules/chatbot/infra/http/routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profiles', profilesRouter);
routes.use('/createMessages', createMessagesRouter);

routes.get('/', (req, res) => {
  return res.send('hello  world');
});

export default routes;
