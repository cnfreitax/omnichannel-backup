import { Router } from 'express';
import routes from '@modules/chatbot/infra/http/routes';
import companyRouter from './company.routes';
import sectorRouter from './sector.routes';
import profileRoute from './profile.routes';

const router = Router();

router.use('/company', companyRouter);
router.use('/sector', sectorRouter);
routes.use('/company/profile', profileRoute);

export default router;
