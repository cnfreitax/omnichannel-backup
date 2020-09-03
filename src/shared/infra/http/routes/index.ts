import { Router } from 'express';
import chatbotRoutes from '@modules/chatbot/infra/http/routes';
import userRoutes from '@modules/user/infra/http/routes';
import companyRouter from '@modules/company/infra/http/routes';

const router = Router();
const routesList = [chatbotRoutes, userRoutes, companyRouter];

for (const route of routesList) {
  router.use('/api', route);
}

export default router;
