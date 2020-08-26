import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/company/services/UpdateProfile.service';
import ShowProfileService from '@modules/company/services/ShowProfile.service';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const company_id = req.company.id;

    const showProfile = container.resolve(ShowProfileService);

    const company = await showProfile.execute({ company_id });

    return res.json(classToClass(company));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const company_id = req.company.id;
    const { name, email, password, oldPassword } = req.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const company = await updateProfile.execute({ company_id, name, password, email, oldPassword });

    return res.json(classToClass(company));
  }
}
