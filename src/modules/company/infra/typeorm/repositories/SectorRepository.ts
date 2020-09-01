import { getRepository, Repository } from 'typeorm';

import ISectorRepository from '@modules/company/repositories/ISectorRepository';
import ICreateSectorDTO from '@modules/company/dtos/ICreateSectorDTO';

import Sector from '@modules/company/infra/typeorm/entities/Sector';

class SectorRepository implements ISectorRepository {
  private ormRepository: Repository<Sector>;

  constructor() {
    this.ormRepository = getRepository(Sector);
  }

  public async findById(id: number): Promise<Sector | undefined> {
    const findSector = await this.ormRepository.findOne({ where: { id } });
    return findSector;
  }

  public async findSectorCompany(label: string, company_id: number): Promise<Sector | undefined> {
    const sector = await this.ormRepository.findOne({ where: { label, company_id } });
    return sector;
  }

  public async findAllCompanySectors(company_id: number): Promise<Sector[] | undefined> {
    const sectors = await this.ormRepository.find({
      where: { company_id },
    });

    return sectors;
  }

  public async create({ company_id, label, phone }: ICreateSectorDTO): Promise<Sector> {
    const sector = this.ormRepository.create({ company_id, label, phone });
    await this.ormRepository.save(sector);

    return sector;
  }

  public async save(sector: Sector): Promise<Sector> {
    return this.ormRepository.save(sector);
  }
}

export default SectorRepository;
