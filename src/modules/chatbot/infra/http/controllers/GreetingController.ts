import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGreetingMessageService from '@modules/chatbot/services/CreateGreetingMessage.service';

export default class CompaniesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const company_id = req.user.id;
    const { text, type } = req.body;

    const createGreetingMessageService = container.resolve(CreateGreetingMessageService);

    const company = await createGreetingMessageService.execute({
      company_id,
      text,
      type,
    });

    return res.json(company);
  }
}
