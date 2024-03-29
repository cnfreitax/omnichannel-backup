import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/infra/typeorm';
import '@shared/container';
import app from './config/app';

const port = process.env.PORT || 3333;

app.listen(port);
