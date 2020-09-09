import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSectorService from '@modules/company/services/CreateSectorService';
import ListAllCompanySectorsService from '@modules/company/services/ListAllCompanySectorsService';
import DeleteSectorService from '@modules/company/services/DeleteSectorService';

export default class SectorController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.params;
    const companyFormat = Number(company_id);
    const listAllCompanySectors = container.resolve(ListAllCompanySectorsService);
    const allSectors = await listAllCompanySectors.execute(companyFormat);
    return res.json(classToClass(allSectors));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { label, phone } = req.body;
    const { company_id } = req.params;
    const companyIdToNumber = Number(company_id);

    const createSectorService = container.resolve(CreateSectorService);
    const sector = await createSectorService.execute({
      label,
      phone,
      company_id: companyIdToNumber,
    });

    return res.json(classToClass(sector));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteSectorService = container.resolve(DeleteSectorService);

    const sector = await deleteSectorService.execute(Number(id));

    return res.json(classToClass(sector));
  }
}
