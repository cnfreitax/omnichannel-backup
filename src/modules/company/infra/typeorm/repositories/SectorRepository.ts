import { getRepository, Repository } from 'typeorm';

import ISectorRepository from '@modules/company/repositories/ISectorRepository';
import ICreateSectorDTO from '@modules/company/dtos/ICreateSectorDTO';

import Sector from '@modules/company/infra/typeorm/entities/Sector';

class SectorRepository implements ISectorRepository {
  private ormRepository: Repository<Sector>;

  constructor() {
    this.ormRepository = getRepository(Sector);
  }

  public async findById(id: string): Promise<Sector | undefined> {
    const findSector = await this.ormRepository.findOne(Number(id));

    return findSector;
  }

  public async findAllCompanySectors(company_id: string): Promise<Sector[] | undefined> {
    const sectors = await this.ormRepository.find({
      where: { company_id: Number(company_id) },
    });

    return sectors;
  }

  public async create({ company_id, label, phone }: ICreateSectorDTO): Promise<Sector> {
    const sector = this.ormRepository.create({ company_id: Number(company_id), label, phone });
    await this.ormRepository.save(sector);

    return sector;
  }

  public async save(sector: Sector): Promise<Sector> {
    return this.ormRepository.save(sector);
  }
}

export default SectorRepository;
