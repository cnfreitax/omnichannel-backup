import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateCompanyService from '@modules/company/services/AuthenticateCompany.service';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateCompanyService = container.resolve(AuthenticateCompanyService);

    const { company, token } = await authenticateCompanyService.execute({
      email,
      password,
    });

    return res.json({ company: classToClass(company), token });
  }
}
