import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AssignUserToSectorService from '@modules/user/services/AssignUserToSectorService';

export default class UserSectorController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { sector_id } = req.body;
    const userIdToNumber = Number(user_id);

    const assignUserToSector = container.resolve(AssignUserToSectorService);

    assignUserToSector.execute({ user_id: userIdToNumber, sector_id });

    return res.json({ ok: true });
  }
}
