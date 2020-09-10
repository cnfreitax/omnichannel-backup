import express, { Request, Response, NextFunction } from 'express';
import uploadConfig from '@config/upload';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import setupMiddlewares from './middlewares';
import router from '../routes';

const app = express();
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

  return res.status(500).json({
    status: 'error',
    message: 'Server Error',
  });
});

app.use('/files', express.static(uploadConfig.uploadsFolder));
export default app;
