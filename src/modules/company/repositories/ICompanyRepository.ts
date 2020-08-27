import Company from '@modules/company/infra/typeorm/entities/Company';
import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';

export default interface ICompanyRepository {
  findById(id: string): Promise<Company | undefined>;
  findAllCompanies(): Promise<Company[] | undefined>;
  create(data: ICreateCompanyDTO): Promise<Company>;
  save(company: Company): Promise<Company>;
}
