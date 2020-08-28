import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSectorService from '@modules/company/services/CreateSector.service';
import ListAllCompanySectorsService from '@modules/company/services/ListAllCompanySectors.service';

export default class SectorController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.body;

    const listAllCompanySectors = container.resolve(ListAllCompanySectorsService);

    const allSectors = await listAllCompanySectors.execute(company_id);

    return res.json(classToClass(allSectors));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { company_id, label, phone } = req.body;

    const createSectorService = container.resolve(CreateSectorService);

    const sector = await createSectorService.execute({
      company_id,
      label,
      phone,
    });

    return res.json(classToClass(sector));
  }
}
