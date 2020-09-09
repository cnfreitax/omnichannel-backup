import { inject, injectable } from 'tsyringe';
import ISaveContainerDTO from '@modules/chatbot/dtos/ISaveContainerDTO';
import IContainerRepository from '@modules/chatbot/repositories/IContainerRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import Container from '@modules/chatbot/infra/typeorm/entities/Container';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateContainerService {
  constructor(
    @inject('ContainerRepository')
    private containerRepository: IContainerRepository,
    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(containerData: ISaveContainerDTO): Promise<Container> {
    const company = await this.companyRepository.findById(containerData.company_id);

    if (!company) {
      throw new AppError('Company not found');
    }

    if (containerData.from) {
      const parentContainer = await this.containerRepository.findById(containerData.from);

      if (!parentContainer) {
        throw new AppError('Parent message does not exist');
      }
    }

    const container = await this.containerRepository.create(containerData);

    return container;
  }
}
