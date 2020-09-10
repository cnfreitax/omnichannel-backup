import { Express } from 'express';
import { bodyParse, contentType, cors, raterLimiter } from '../middlewares';

export default (app: Express): void => {
  app.use(cors);
  app.use(bodyParse);
  app.use(contentType);
  app.use(raterLimiter);
};
