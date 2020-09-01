import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AssignUserToSectorService from '@modules/user/services/AssignUserToSectorService';

export default class UserSectorController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { sector_id } = req.params;
    const { user_id } = req.body;
    const sectorIdToNumber = Number(sector_id);

    const assignUserToSector = container.resolve(AssignUserToSectorService);

    assignUserToSector.execute({ user_id, sector_id: sectorIdToNumber });

    return res.json({ ok: true });
  }
}
