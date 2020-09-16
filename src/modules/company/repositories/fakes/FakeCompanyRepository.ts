import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';

import Company from '@modules/company/infra/typeorm/entities/Company';

class FakeCompanyRepository implements ICompanyRepository {
  private companies: Company[] = [];

  public async findAllCompanies(): Promise<Company[] | undefined> {
    return this.companies;
  }

  public async findByCodCampaign(cod: string): Promise<Company | undefined> {
    const companyMatchEmail = this.companies.find(company => company.codCampaign === cod);
    return companyMatchEmail;
  }

  public async findByEmail(email: string): Promise<Company | undefined> {
    const companyMatchEmail = this.companies.find(company => company.email === email);
    return companyMatchEmail;
  }

  public async del(company: Company): Promise<Company> {
    const index = this.companies.findIndex(findCompany => findCompany.id === company.id);
    this.companies.splice(index);
    return company;
  }

  public async findById(id: number): Promise<Company | undefined> {
    const findCompany = this.companies.find(company => company.id === id);
    return findCompany;
  }

  public async findByCnpj(cnpj: string): Promise<Company | undefined> {
    const findCompany = this.companies.find(company => company.cnpj === cnpj);
    return findCompany;
  }

  public async create({ name, cnpj, email, activity, address, ddd, website, webhook_response, webhook_status }: ICreateCompanyDTO): Promise<Company> {
    const company = new Company();
    const date = new Date();
    const id = date.getTime() + Math.round(Math.random() * 100);
    Object.assign(company, { id, name, cnpj, email, activity, address, ddd, website, webhook_response, webhook_status });
    this.companies.push(company);
    return company;
  }

  public async save(company: Company): Promise<Company> {
    const index = this.companies.findIndex(findCompany => findCompany.id === company.id);
    this.companies[index] = company;
    return company;
  }
}

export default FakeCompanyRepository;
