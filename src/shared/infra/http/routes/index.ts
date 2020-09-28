import { Router, Request, Response } from 'express';
import chatbotRoutes from '@modules/chatbot/infra/http/routes';
import userRoutes from '@modules/user/infra/http/routes';
import companyRouter from '@modules/company/infra/http/routes';
import messageRouter from '@modules/messageHandler/infra/http/routes/message.routes';

const router = Router();
const routesList = [chatbotRoutes, userRoutes, companyRouter];

// TODO DELETE TEST ROUTE LATER
messageRouter.get('/', (req: Request, res: Response) => {
  const query = req.query;
  console.log(query);
  return res.json({ description: 'WUBAUVAIUVIAaofuiasifuj' });
});
router.use('/', messageRouter);
for (const route of routesList) {
  router.use('/api', route);
}

export default router;
