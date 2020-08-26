import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Company from '@modules/company/infra/typeorm/entities/Company';

import ICompaniesRepository from '@modules/company/repositories/ICompanyRepository';
import IHashProvider from '@modules/company/providers/HashProvider/models/IHashProvider';

interface Request {
  company_id: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

@injectable()
class UpdateProfile {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ company_id, name, email, oldPassword, password }: Request): Promise<Company> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company not exist');
    }

    const companyWithUpdatedEmail = await this.companiesRepository.findByEmail(email);

    if (companyWithUpdatedEmail && companyWithUpdatedEmail.id !== Number(company_id)) {
      throw new AppError('Email alread in use');
    }

    if (password && !oldPassword) {
      throw new AppError('You need to inform the old password to set a new pssword');
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(oldPassword, company.password);
      if (!checkOldPassword) {
        throw new AppError('The old password is wrong');
      }

      company.password = await this.hashProvider.generateHash(password);
    }

    company.name = name;
    company.email = email;

    return this.companiesRepository.save(company);
  }
}

export default UpdateProfile;
