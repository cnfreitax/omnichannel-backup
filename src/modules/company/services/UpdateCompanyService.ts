import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Company from '@modules/company/infra/typeorm/entities/Company';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';

interface Request {
  id: number;
  name: string;
  email: string;
  address?: string;
  activity?: string;
  ddd?: string;
  website?: string;
}

@injectable()
export default class UpdateProfile {
  constructor(
    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute({ id, name, email, address, activity, ddd, website }: Request): Promise<Company> {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new AppError('Company not exist');
    }

    const companyWithUpdatedEmail = await this.companyRepository.findByEmail(email);

    if (companyWithUpdatedEmail && companyWithUpdatedEmail.id !== company.id) {
      throw new AppError('Email alread in use');
    }

    if (address) {
      company.address = address;
    }

    if (activity) {
      company.activity = activity;
    }

    if (ddd) {
      company.ddd = ddd;
    }

    if (website) {
      company.website = website;
    }
    company.name = name;
    company.email = email;

    return this.companyRepository.save(company);
  }
}
