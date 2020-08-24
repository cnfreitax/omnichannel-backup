// src/routes/index.ts
// src/routes/index.ts
import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordsRouter from '@modules/users/infra/http/routes/passwords.routes';
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordsRouter);
routes.use('/profiles', profilesRouter);

routes.get('/', (req, res) => {
  return res.send('hello  world');
});

export default routes;
