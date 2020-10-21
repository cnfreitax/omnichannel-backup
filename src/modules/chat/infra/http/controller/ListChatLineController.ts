import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllChatFromCompany from '@modules/chat/service/ListAllChatFromCompany';

export default class ListChatLineController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { company_id, sector_id } = req.query;
    const chatList = container.resolve(ListAllChatFromCompany);
    const companyIdFormat = Number(company_id);
    const list = await chatList.execute(companyIdFormat, Number(sector_id));

    return res.json(list);
  }
}
