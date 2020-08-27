import { injectable, inject } from 'tsyringe';

import Company from '@modules/company/infra/typeorm/entities/Company';

import ICompaniesRepository from '@modules/company/repositories/ICompanyRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Company> {
    const company = await this.companiesRepository.create({
      name,
    });

    return company;
  }
}

export default CreateCompanyService;
