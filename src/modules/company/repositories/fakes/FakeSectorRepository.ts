import ISectorRepository from '@modules/company/repositories/ISectorRepository';
import ICreateSectorDTO from '@modules/company/dtos/ICreateSectorDTO';

import Sector from '@modules/company/infra/typeorm/entities/Sector';

class FakeSectorRepository implements ISectorRepository {
  private sectors: Sector[] = [];

  public async findById(id: number): Promise<Sector | undefined> {
    const findSector = this.sectors.find(sector => sector.id === id);

    return findSector;
  }

  public async findSectorCompany(label: string, company_id: number): Promise<Sector | undefined> {
    const sector = this.sectors.find(selectedSector => selectedSector.company_id === company_id && selectedSector.label === label);
    return sector;
  }

  public async findAllCompanySectors(company_id: number): Promise<Sector[] | undefined> {
    const findSectors: Sector[] = [];

    this.sectors.forEach(sector => {
      if (sector.company_id === company_id) {
        findSectors.push(sector);
      }
    });

    return findSectors;
  }

  public async create({ company_id, label, phone }: ICreateSectorDTO): Promise<Sector> {
    const sector = new Sector();

    const date = new Date();
    const id = date.getTime() + Math.round(Math.random() * 100);

    Object.assign(sector, { id, company_id, label, phone });

    this.sectors.push(sector);

    return sector;
  }

  public async save(sector: Sector): Promise<Sector> {
    const index = this.sectors.findIndex(findSector => findSector.id === sector.id);

    this.sectors[index] = sector;

    return sector;
  }
}

export default FakeSectorRepository;
