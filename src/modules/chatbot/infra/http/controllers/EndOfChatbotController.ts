import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEndOfChatbotMessageService from '@modules/chatbot/services/CreateEndOfChatbotMessageService';

export default class EndOfChatbotController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.params;
    const { description, type, from } = req.body;
    const formatCompanyId = Number(company_id);

    const createEndOfChatbotMessageService = container.resolve(CreateEndOfChatbotMessageService);

    const message = await createEndOfChatbotMessageService.execute({
      company_id: formatCompanyId,
      description,
      type,
      from,
    });

    return res.json(message);
  }
}
