import { inject, injectable } from 'tsyringe';

import ISaveContainerDTO from '@modules/chatbot/dtos/ISaveContainerDTO';
import IContainerRepository from '@modules/chatbot/repositories/IContainerRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';

import Container, { ContainerType } from '@modules/chatbot/infra/typeorm/entities/Container';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateGreetingMessage {
  constructor(
    @inject('ContainerRepository')
    private containerRepository: IContainerRepository,
    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute({ description, type, company_id }: ISaveContainerDTO): Promise<Container> {
    const company = await this.companyRepository.findById(company_id);
    if (!company) {
      throw new AppError('Company not found');
    }

    const greetingExists = await this.containerRepository.findExistingContainer({ company_id, type });
    if (greetingExists) {
      throw new AppError('This company already has a greeting message');
    }

    if (type !== ContainerType.GREETING) {
      throw new AppError('Wrong message type');
    }

    const greetingContainer = await this.containerRepository.create({ description, company_id, type });

    return greetingContainer;
  }
}

export default CreateGreetingMessage;
