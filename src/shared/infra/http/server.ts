import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';
import app from './config/app';

const port = process.env.PORT || 3333;

app.use(routes);
app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Server Error',
  });
});

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.listen(port, () => console.log(`✔✔ server running on  ${port}!`));
