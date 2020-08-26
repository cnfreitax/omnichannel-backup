import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Company from '@modules/company/infra/typeorm/entities/Company';

import ICompaniesRepository from '@modules/company/repositories/ICompanyRepository';

import IHashProvider from '@modules/company/providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<Company> {
    const isEmailUsed = await this.companiesRepository.findByEmail(email);
    if (isEmailUsed) {
      throw new AppError('Email Addres Alread used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const company = await this.companiesRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return company;
  }
}

export default CreateCompanyService;
