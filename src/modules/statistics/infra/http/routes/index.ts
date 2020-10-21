import { Router } from 'express';
import contactRecordRouter from './contactRecord.routes';

const routes = Router();
routes.use('/record-contact', contactRecordRouter);

export default routes;
