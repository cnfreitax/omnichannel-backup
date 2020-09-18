import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContainerService from '@modules/chatbot/services/CreateContainerService';
import ListAllCompanyContainersService from '@modules/chatbot/services/ListAllCompanyContainersService';
import UpdateContainerService from '@modules/chatbot/services/UpdateContainerService';

export default class ContainerController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.query;

    const listCompanyContainers = container.resolve(ListAllCompanyContainersService);

    const companyContainers = await listCompanyContainers.execute(Number(company_id));

    return res.json(companyContainers);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.params;
    const { description, type, from, to, content, expects_input } = req.body;

    const createContainer = container.resolve(CreateContainerService);

    const message = await createContainer.execute({
      company_id: Number(company_id),
      description,
      type,
      content,
      from,
      to,
      expects_input,
    });

    return res.json(message);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { container_id } = req.params;
    const { from, to, content, description, expects_input } = req.body;

    const updateContainer = container.resolve(UpdateContainerService);

    const message = await updateContainer.execute({
      id: Number(container_id),
      content,
      description,
      to: Number(to),
      from: Number(from),
      expects_input,
    });

    return res.json(message);
  }
}
