import { injectable, inject } from 'tsyringe';
import Company from '@modules/company/infra/typeorm/entities/Company';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  cnpj: string;
}

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompanyRepository,
  ) {}

  public async execute({ name, cnpj }: IRequest): Promise<Company> {
    const companyExists = await this.companiesRepository.findByCnpj(cnpj);

    if (companyExists) {
      throw new AppError('Company already registered');
    }

    const company = await this.companiesRepository.create({
      name,
      cnpj,
    });

    return company;
  }
}

export default CreateCompanyService;
