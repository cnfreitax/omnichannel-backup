import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyService from '@modules/company/services/CreateCompany.service';

export default class CompaniesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, cnpj } = req.body;

    const createCompanyService = container.resolve(CreateCompanyService);

    const company = await createCompanyService.execute({
      name,
      cnpj,
    });

    return res.json(classToClass(company));
  }
}
