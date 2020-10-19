import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateProfileService from '@modules/user/services/UpdateProfileService';

export default class AdmUserUpdateCommonProfileController {
  public async update(req: Request, res: Response): Promise<Response> {
    const id = req.params;
    const formatId = Number(id);
    const { name, email, password, oldPassword } = req.body;
    const updateProfile = container.resolve(UpdateProfileService);
    const user = await updateProfile.execute({ id: formatId, name, email, password, oldPassword });
    return res.json(classToClass(user));
  }
}
