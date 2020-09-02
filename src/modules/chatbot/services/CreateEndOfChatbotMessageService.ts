import { inject, injectable } from 'tsyringe';

import ISaveContainerDTO from '@modules/chatbot/dtos/ISaveContainerDTO';
import IContainerRepository from '@modules/chatbot/repositories/IContainerRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';

import Container, { ContainerType } from '@modules/chatbot/infra/typeorm/entities/Container';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateEndOfChatbotMessage {
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

    const endChatbotMessageExists = await this.containerRepository.findExistingContainer({
      company_id: containerData.company_id,
      type: containerData.type,
    });

    if (endChatbotMessageExists) {
      throw new AppError('This company already has a end of chatbot message');
    }

    if (containerData.type !== ContainerType.END_CHATBOT) {
      throw new AppError('Wrong message type');
    }

    const endOfChatbotContainer = await this.containerRepository.create(containerData);

    return endOfChatbotContainer;
  }
}

export default CreateEndOfChatbotMessage;
