import Sector from '@modules/company/infra/typeorm/entities/Sector';
import ICreateSectorDTO from '@modules/company/dtos/ICreateSectorDTO';

export default interface ISectorRepository {
  findById(id: number): Promise<Sector | undefined>;
  findAllCompanySectors(company_id: string): Promise<Sector[] | undefined>;
  create(data: ICreateSectorDTO): Promise<Sector>;
  save(sector: Sector): Promise<Sector>;
}
