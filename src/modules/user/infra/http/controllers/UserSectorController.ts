import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AssignUserToSectorService from '@modules/user/services/AssignUserToSectorService';
import { classToClass } from 'class-transformer';

export default class UserSectorController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { sector_id } = req.body;
    const userIdToNumber = Number(user_id);

    const assignUserToSector = container.resolve(AssignUserToSectorService);

    const assingSector = assignUserToSector.execute({ user_id: userIdToNumber, sector_id });

    return res.json(classToClass(assingSector));
  }
}
