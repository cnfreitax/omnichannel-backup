import { Router, Request, Response } from 'express';
import chatbotRoutes from '@modules/chatbot/infra/http/routes';
import userRoutes from '@modules/user/infra/http/routes';
import companyRouter from '@modules/company/infra/http/routes';
import messageRouter from '@modules/messageHandler/infra/http/routes/message.routes';
import chatRouter from '@modules/chat/infra/http/routes';
import messageChatRouter from '@modules/chat/infra/http/routes/handleChat';
import statisticsRoutes from '@modules/statistics/infra/http/routes';

const router = Router();
const routesList = [chatbotRoutes, userRoutes, companyRouter, chatRouter, statisticsRoutes];

// TODO DELETE TEST ROUTE LATER
messageRouter.post('/', (req: Request, res: Response) => {
  return res.json({ description: 'ok' });
});
router.use('/', messageRouter);
router.use('/', messageChatRouter);
for (const route of routesList) {
  router.use('/api', route);
}

export default router;
