import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListaAvailableAttendants from '@modules/chat/service/ListAvailableAttendants';

export default class AvailableUsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.query;
    const listUser = container.resolve(ListaAvailableAttendants);
    const companyIdFormat = Number(company_id);
    const userList = await listUser.execute(companyIdFormat);

    return res.json(userList);
  }
}
