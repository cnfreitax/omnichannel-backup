import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddMediaToContainerService from '@modules/chatbot/services/AddMediaToContainerService';

export default class MediaController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.params;
    const { container_id } = req.body;
    const mediaFileName = req.file.filename;

    const formatCompanyId = Number(company_id);
    const formatContainerId = Number(container_id);

    const addMediaToContainerService = container.resolve(AddMediaToContainerService);

    const mediaContainer = await addMediaToContainerService.execute({
      company_id: formatCompanyId,
      container_id: formatContainerId,
      mediaFileName,
    });

    return res.json(mediaContainer);
  }
}
