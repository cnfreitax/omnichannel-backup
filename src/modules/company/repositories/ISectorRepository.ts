import Sector from '@modules/company/infra/typeorm/entities/Sector';
import ICreateSectorDTO from '@modules/company/dtos/ICreateSectorDTO';

export default interface ISectorRepository {
  findById(id: number): Promise<Sector | undefined>;
  findSectorCompany(label: string, company_id: number): Promise<Sector | undefined>;
  findAllCompanySectors(company_id: number): Promise<Sector[] | undefined>;
  create(data: ICreateSectorDTO): Promise<Sector>;
  save(sector: Sector): Promise<Sector>;
  del(company: Sector): Promise<Sector>;
}
