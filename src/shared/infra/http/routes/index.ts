import { Router } from 'express';
import userRouter from '@modules/user/infra/http/routes/user.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import companiesRouter from '@modules/company/infra/http/routes/company.routes';
import sectorsRouter from '@modules/company/infra/http/routes/sector.routes';
import profilesRouter from '@modules/user/infra/http/routes/profiles.routes';
import sectorUserRoute from '@modules/user/infra/http/routes/assignSector.routes';
import listUserRouter from '@modules/user/infra/http/routes/listUser.routes';
import optionRouter from '@modules/chatbot/infra/http/routes/option.routes';
import '@modules/chatbot/infra/http/routes';

const routes = Router();

// User
routes.use('/api/signup', userRouter); // register user
routes.use('/api/signin', sessionsRouter); // session
routes.use('/api/users', listUserRouter); // List all users, from company or sector

// Company
routes.use('/api/company', companiesRouter); // create and list company
// Create sector to company
routes.use('/api/company/sector', sectorsRouter); // create sector
routes.use('/api/profile', profilesRouter); // edit and view profile
routes.use('/api/sector', sectorUserRoute); // assing sector to a user

// Options
routes.use('/api/options', optionRouter); // create option insede container

export default routes;
