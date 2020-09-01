import { Router } from 'express';
import userRouter from '@modules/user/infra/http/routes/user.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import companiesRouter from '@modules/company/infra/http/routes/company.routes';
import sectorsRouter from '@modules/company/infra/http/routes/sector.routes';
import profilesRouter from '@modules/user/infra/http/routes/profiles.routes';
import sectorUserRoute from '@modules/user/infra/http/routes/assignSector.routes';
import listUserRoute from '@modules/user/infra/http/routes/listUser.route';

const routes = Router();

routes.use('/api/signup', userRouter); // register user
routes.use('/api/signin', sessionsRouter); // session
routes.use('/api/company', companiesRouter); // create and list company
routes.use('/api/company/sector', sectorsRouter); // create sector
routes.use('/api/profile', profilesRouter); // edit and view profile
routes.use('/api/sector', sectorUserRoute); // assing sector to a user
routes.use('/api/users', listUserRoute); // List all users, from company or sector
export default routes;
