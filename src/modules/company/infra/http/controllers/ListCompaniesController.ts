import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllCompaniesService from '@modules/company/services/ListAllCompaniesService';

export default class ListCompaniesController {
  public async show(_req: Request, res: Response): Promise<Response> {
    const listCompanies = container.resolve(ListAllCompaniesService);

    const companies = await listCompanies.execute();

    return res.json(companies);
  }
}
