import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEndOfChatbotMessageService from '@modules/chatbot/services/CreateEndOfChatbotMessage.service';

export default class CostumerSurveyController {
  public async create(req: Request, res: Response): Promise<Response> {
    const company_id = req.company.id;
    const { text, type, parent_id } = req.body;

    const createEndOfChatbotMessageService = container.resolve(CreateEndOfChatbotMessageService);

    const message = await createEndOfChatbotMessageService.execute({
      company_id,
      text,
      type,
      parent_id,
    });

    return res.json(message);
  }
}
