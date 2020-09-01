import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCostumerSurveyService from '@modules/chatbot/services/CreateCostumerSurvey.service';

export default class CostumerSurveyController {
  public async create(req: Request, res: Response): Promise<Response> {
    const company_id = req.company.id;
    const { text, type, parent_id } = req.body;

    const createCostumerSurveyService = container.resolve(CreateCostumerSurveyService);

    const message = await createCostumerSurveyService.execute({
      company_id,
      text,
      type,
      parent_id,
    });

    return res.json(message);
  }
}
