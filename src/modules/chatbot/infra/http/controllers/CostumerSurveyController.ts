import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCostumerSurveyService from '@modules/chatbot/services/CreateCostumerSurveyService';

export default class CostumerSurveyController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.params;
    const { description, type, from, to } = req.body;
    const formatCompanyId = Number(company_id);

    const createCostumerSurveyService = container.resolve(CreateCostumerSurveyService);

    const message = await createCostumerSurveyService.execute({
      company_id: formatCompanyId,
      description,
      type,
      from,
      to,
    });

    return res.json(message);
  }
}
