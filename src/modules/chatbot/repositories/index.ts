import { container } from 'tsyringe';

import IChatbotRepository from '@modules/chatbot/repositories/IChatbotRepository';
import ChatbotRepository from '@modules/chatbot/infra/typeorm/repositories/ChatbotRepository';

container.registerSingleton<IChatbotRepository>('ChatbotRepository', ChatbotRepository);
