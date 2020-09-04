import { Request, Response } from 'express';
import CreateOptionService from '@modules/chatbot/services/CreateOptionService';
import { container } from 'tsyringe';

export default class OptionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { description } = req.body;
    const { container_id } = req.params;
    const containerIdFormat = Number(container_id);

    const createOptionService = container.resolve(CreateOptionService);
    const option = await createOptionService.execute({ description, container_id: containerIdFormat });
    return res.json(option);
  }
}
