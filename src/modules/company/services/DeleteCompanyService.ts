import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Company from '../infra/typeorm/entities/Company';
import ICompanyRepository from '../repositories/ICompanyRepository';

@injectable()
export default class DeleteCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(id: number): Promise<Company> {
    const company = await this.companyRepository.findById(id);
    if (!company) {
      throw new AppError('Company not found.');
    }
    this.companyRepository.del(company);
    return company;
  }
}
