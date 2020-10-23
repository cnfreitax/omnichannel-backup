import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import uploadConfig from '@config/upload';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import setupMiddlewares from './middlewares';
import setupSwaggerCOnfig from './config-swagger';

import router from '../routes';

const app = express();
app.post('/whatsapp/response', express.raw({ type: '*/*' }));
app.post('/whatsapp/status', express.raw({ type: '*/*' }));
setupSwaggerCOnfig(app);
setupMiddlewares(app);
app.use(errors());
app.use(router);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 500,
    message: 'Server Error',
  });
});

app.use('/files', express.static(uploadConfig.uploadsFolder));
export default app;
