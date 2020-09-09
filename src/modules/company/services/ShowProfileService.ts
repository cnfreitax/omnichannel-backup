import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICompanyRepository from '../repositories/ICompanyRepository';
import Company from '../infra/typeorm/entities/Company';

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(id: number): Promise<Company> {
    const company = await this.companyRepository.findById(id);
    if (!company) {
      throw new AppError('Company not found');
    }

    return company;
  }
}
