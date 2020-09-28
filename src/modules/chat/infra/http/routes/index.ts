import { Router } from 'express';
import listUserAvailableRouter from './listAvailable';

const routes = Router();
routes.use('/available', listUserAvailableRouter);

export default routes;
