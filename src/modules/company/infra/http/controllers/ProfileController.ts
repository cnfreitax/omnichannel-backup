import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateCompanyService from '@modules/company/services/UpdateCompanyService';
import ShowProfileService from '@modules/company/services/ShowProfileService';

export default class ProfileCompanyController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const viewCompany = container.resolve(ShowProfileService);
    const company = await viewCompany.execute(Number(id));
    return res.json(classToClass(company));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, address, ddd, activity, website } = req.body;

    const formatId = Number(id);
    const updateCompany = container.resolve(UpdateCompanyService);
    const user = await updateCompany.execute({ id: formatId, name, email, address, ddd, activity, website });
    return res.json(classToClass(user));
  }
}
