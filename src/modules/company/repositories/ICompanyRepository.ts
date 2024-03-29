import Company from '@modules/company/infra/typeorm/entities/Company';
import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';

export default interface ICompanyRepository {
  findById(id: number): Promise<Company | undefined>;
  findByEmail(email: string): Promise<Company | undefined>;
  findByCnpj(cnpj: string): Promise<Company | undefined>;
  findByCodCampaign(codCampaign: string): Promise<Company | undefined>;
  findAllCompanies(): Promise<Company[] | undefined>;
  create(data: ICreateCompanyDTO): Promise<Company>;
  save(company: Company): Promise<Company>;
  del(company: Company): Promise<Company>;
}
