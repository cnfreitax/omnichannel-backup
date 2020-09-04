import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGreetingMessageService from '@modules/chatbot/services/CreateGreetingMessage.service';

export default class CompaniesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const company_id = req.params;
    const { text, type } = req.body;
    const formatCompanyId = Number(company_id);

    const createGreetingMessageService = container.resolve(CreateGreetingMessageService);

    const company = await createGreetingMessageService.execute({
      company_id: formatCompanyId,
      text,
      type,
    });

    return res.json(company);
  }
}
