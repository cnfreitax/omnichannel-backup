import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContainerService from '@modules/chatbot/services/CreateContainerService';
import ListAllCompanyContainersService from '@modules/chatbot/services/ListAllCompanyContainersService';

export default class ContainerController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.body;

    const listCompanyContainers = container.resolve(ListAllCompanyContainersService);

    const companyContainers = await listCompanyContainers.execute(Number(company_id));

    return res.json(companyContainers);
  }

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
