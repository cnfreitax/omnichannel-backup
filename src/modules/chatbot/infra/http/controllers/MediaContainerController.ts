import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMediaContainerService from '@modules/chatbot/services/CreateMediaContainerService';

export default class GreetingController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.params;
    const { description, type, content, expects_input, from, to } = req.body;
    const mediaFileName = req.file.filename;

    const formatCompanyId = Number(company_id);

    const createMediaContainerService = container.resolve(CreateMediaContainerService);

    const company = await createMediaContainerService.execute({
      company_id: formatCompanyId,
      description,
      type,
      content,
      expects_input,
      from,
      to,
      mediaFileName,
    });

    return res.json(company);
  }
}
