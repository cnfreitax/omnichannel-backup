import { injectable, inject } from 'tsyringe';

import Company from '@modules/company/infra/typeorm/entities/Company';

import ICompaniesRepository from '@modules/company/repositories/ICompanyRepository';

@injectable()
class ListAllCompaniesService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute(): Promise<Company[] | undefined> {
    const allCompanies = await this.companiesRepository.findAllCompanies();

    return allCompanies;
  }
}

export default ListAllCompaniesService;
