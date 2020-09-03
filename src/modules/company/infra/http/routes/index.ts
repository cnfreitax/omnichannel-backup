import { Router } from 'express';
import companyRouter from './company.routes';
import sectorRouter from './sector.routes';

const router = Router();

router.use('/company', companyRouter);
router.use('/sector', sectorRouter);

export default router;
