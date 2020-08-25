import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Company from '@modules/company/infra/typeorm/entities/Company';

import ICompaniesRepository from '@modules/company/repositories/ICompanyRepository';

interface Request {
  company_id: string;
}

@injectable()
class ShowProfile {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ company_id }: Request): Promise<Company> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company not exist');
    }

    return company;
  }
}

export default ShowProfile;
