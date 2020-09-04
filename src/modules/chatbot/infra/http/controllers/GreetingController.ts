import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGreetingMessageService from '@modules/chatbot/services/CreateGreetingMessageService';

export default class GreetingController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.params;
    const { description, type } = req.body;
    const formatCompanyId = Number(company_id);

    const createGreetingMessageService = container.resolve(CreateGreetingMessageService);

    const company = await createGreetingMessageService.execute({
      company_id: formatCompanyId,
      description,
      type,
    });

    return res.json(company);
  }
}
