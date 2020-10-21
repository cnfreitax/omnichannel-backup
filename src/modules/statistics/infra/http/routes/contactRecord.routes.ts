import { Router } from 'express';
import { ContactRecordController } from '@modules/statistics/infra/http/controllers/ContactRecordController';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';

const contactRecordController = new ContactRecordController();
const contactRecordRouter = Router();

contactRecordRouter.post('/', ensureAuthenticated, contactRecordController.create);

export default contactRecordRouter;
