import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar.service';

export default class AvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    return res.json(classToClass(user));
  }
}
