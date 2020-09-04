import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContainerService from '@modules/chatbot/services/CreateContainerService';

export default class ContainerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.params;
    const { description, type, from, to, content } = req.body;

    const createContainer = container.resolve(CreateContainerService);

    const message = await createContainer.execute({
      company_id: Number(company_id),
      description,
      type,
      content,
      from,
      to,
    });

    return res.json(message);
  }
}
