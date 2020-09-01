import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyService from '@modules/company/services/CreateCompanyService';
import ListAllCompaniesService from '@modules/company/services/ListAllCompaniesService';

export default class CompaniesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listAllCompaniesService = container.resolve(ListAllCompaniesService);

    const allCompanies = await listAllCompaniesService.execute();

    return res.json(classToClass(allCompanies));
  }

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
