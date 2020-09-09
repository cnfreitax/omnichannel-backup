import { injectable, inject } from 'tsyringe';
import Company from '@modules/company/infra/typeorm/entities/Company';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  cnpj: string;
  email: string;
  address: string;
  ddd: string;
  website: string;
  logo?: string;
  activity: string;
  webhook_status?: string;
  webhook_response?: string;
}

@injectable()
export default class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompanyRepository,
  ) {}

  public async execute(data: IRequest): Promise<Company> {
    const companyExists = await this.companiesRepository.findByCnpj(data.cnpj);
    if (companyExists) {
      throw new AppError('Company already registered');
    }

    const emailUsed = await this.companiesRepository.findByEmail(data.email);
    if (emailUsed) {
      throw new AppError('E-mail already used');
    }

    const company = await this.companiesRepository.create(data);

    return company;
  }
}
