import { inject, injectable } from 'tsyringe';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import AppError from '@shared/errors/AppError';
import Container from '../infra/typeorm/entities/Container';
import IContainerRepository from '../repositories/IContainerRepository';

@injectable()
export default class ListAllCompanyContainersService {
  constructor(
    @inject('ContainerRepository')
    private containerRepository: IContainerRepository,

    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(company_id: number): Promise<Container[]> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company not found');
    }

    const containers = await this.containerRepository.listAllCompanyContainers(company_id);

    return containers;
  }
}
