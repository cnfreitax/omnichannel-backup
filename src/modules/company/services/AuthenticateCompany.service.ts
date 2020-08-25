import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import Company from '@modules/company/infra/typeorm/entities/Company';

import IHashProvider from '@modules/company/providers/HashProvider/models/IHashProvider';

import ICompaniesRepository from '@modules/company/repositories/ICompanyRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  company: Company;
  token: string;
}

@injectable()
class AuthenticateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const company = await this.companiesRepository.findByEmail(email);
    if (!company) {
      throw new AppError('incorrect email/password .', 401);
    }

    const match = await this.hashProvider.compareHash(password, company.password);

    if (!match) {
      throw new AppError('incorrect email/password .', 401);
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: `${company.id}`,
      expiresIn,
    });

    return { company, token };
  }
}

export default AuthenticateCompanyService;
