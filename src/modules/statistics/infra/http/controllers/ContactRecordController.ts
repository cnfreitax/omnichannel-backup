import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RegisterCostumerContactService from '@modules/statistics/services/RegisterCostumerContactService';

export class ContactRecordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { chat_type, customer_id, company_id, attendant_id, sector_id, initial_date, final_date } = req.body;
    const createContactRecordService = container.resolve(RegisterCostumerContactService);
    const contactRecord = await createContactRecordService.execute({
      chat_type,
      customer_id,
      company_id,
      attendant_id,
      sector_id,
      initial_date,
      final_date,
    });

    return res.status(200).json(contactRecord);
  }
}
