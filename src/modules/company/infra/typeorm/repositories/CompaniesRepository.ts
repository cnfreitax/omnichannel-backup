import { getRepository, Repository } from 'typeorm';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';

import Company from '@modules/company/infra/typeorm/entities/Company';

class CompanyRepository implements ICompanyRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  public async findById(id: string): Promise<Company | undefined> {
    const findCompany = await this.ormRepository.findOne(Number(id));

    return findCompany;
  }

  public async findAllCompanies(): Promise<Company[]> {
    const companies = await this.ormRepository.find();

    return companies;
  }

  public async create({ name }: ICreateCompanyDTO): Promise<Company> {
    const company = this.ormRepository.create({ name });
    await this.ormRepository.save(company);

    return company;
  }

  public async save(company: Company): Promise<Company> {
    return this.ormRepository.save(company);
  }
}

export default CompanyRepository;
