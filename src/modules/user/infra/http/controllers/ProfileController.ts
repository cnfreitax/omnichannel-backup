import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/user/services/UpdateProfileService';
import ShowProfileService from '@modules/user/services/ShowProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ id });

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { name, email, password, oldPassword } = req.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({ id, name, password, email, oldPassword });

    return res.json(classToClass(user));
  }
}
