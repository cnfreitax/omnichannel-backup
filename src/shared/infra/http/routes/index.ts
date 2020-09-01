import { Router } from 'express';
import userRouter from '@modules/user/infra/http/routes/user.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import companiesRouter from '@modules/company/infra/http/routes/company.routes';
import sectorsRouter from '@modules/company/infra/http/routes/sector.routes';
import profilesRouter from '@modules/user/infra/http/routes/profiles.routes';
import sectorUserRoute from '@modules/user/infra/http/routes/assignSector.routes';
import listUserRoute from '@modules/user/infra/http/routes/listUser.route';

const routes = Router();

routes.use('/signup', userRouter); // register user
routes.use('/signin', sessionsRouter); // session
routes.use('/company', companiesRouter); // create and list company
routes.use('/company/sector', sectorsRouter); // creacte sector
routes.use('/profile', profilesRouter); // edit and view profile
routes.use('/sector', sectorUserRoute); // assing sector to a user
routes.use('/users', listUserRoute); // List all users, from company or sector
export default routes;
