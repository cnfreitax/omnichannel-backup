import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEndOfChatbotMessageService from '@modules/chatbot/services/CreateEndOfChatbotMessageService';

export default class CostumerSurveyController {
  public async create(req: Request, res: Response): Promise<Response> {
    const company_id = req.params;
    const { text, type, parent_id } = req.body;
    const formatCompanyId = Number(company_id);

    const createEndOfChatbotMessageService = container.resolve(CreateEndOfChatbotMessageService);

    const message = await createEndOfChatbotMessageService.execute({
      company_id: formatCompanyId,
      text,
      type,
      parent_id,
    });

    return res.json(message);
  }
}
