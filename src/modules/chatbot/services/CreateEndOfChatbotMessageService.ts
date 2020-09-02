import { inject, injectable } from 'tsyringe';

<<<<<<< HEAD
import ISaveMessageDTO from '@modules/chatbot/dtos/ISaveMessageDTO';
import IChatbotRepository from '@modules/chatbot/repositories/IChatbotRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';

import Message, { MessageType } from '@modules/chatbot/infra/typeorm/entities/Message';
=======
import ISaveContainerDTO from '@modules/chatbot/dtos/ISaveContainerDTO';
import IContainerRepository from '@modules/chatbot/repositories/IContainerRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';

import Container, { ContainerType } from '@modules/chatbot/infra/typeorm/entities/Container';
>>>>>>> bcd7dbdbbcdb18154d4b3bb05a95a3fc07c76fdd
import AppError from '@shared/errors/AppError';

@injectable()
class CreateEndOfChatbotMessage {
  constructor(
<<<<<<< HEAD
    @inject('ChatbotRepository')
    private chatbotRepository: IChatbotRepository,
=======
    @inject('ContainerRepository')
    private containerRepository: IContainerRepository,
>>>>>>> bcd7dbdbbcdb18154d4b3bb05a95a3fc07c76fdd
    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,
  ) {}

<<<<<<< HEAD
  public async execute({ company_id, text, type, parent_id }: ISaveMessageDTO): Promise<Message> {
    const company = await this.companyRepository.findById(company_id);
=======
  public async execute(containerData: ISaveContainerDTO): Promise<Container> {
    const company = await this.companyRepository.findById(containerData.company_id);
>>>>>>> bcd7dbdbbcdb18154d4b3bb05a95a3fc07c76fdd

    if (!company) {
      throw new AppError('Company not found');
    }

<<<<<<< HEAD
    const endChatbotMessageExists = await this.chatbotRepository.findExistingMessage({ company_id, type });
=======
    const endChatbotMessageExists = await this.containerRepository.findExistingContainer({
      company_id: containerData.company_id,
      type: containerData.type,
    });

>>>>>>> bcd7dbdbbcdb18154d4b3bb05a95a3fc07c76fdd
    if (endChatbotMessageExists) {
      throw new AppError('This company already has a end of chatbot message');
    }

<<<<<<< HEAD
    if (parent_id) {
      const parentMessage = await this.chatbotRepository.findById(parent_id);

      if (!parentMessage) {
        throw new AppError('Parent message does not exist');
      }
    }

    if (type !== MessageType.END_CHATBOT) {
      throw new AppError('Wrong message type');
    }

    const message = await this.chatbotRepository.create({
      company_id,
      text,
      type,
      parent_id: parent_id || null,
    });

    return message;
=======
    if (containerData.type !== ContainerType.END_CHATBOT) {
      throw new AppError('Wrong message type');
    }

    const endOfChatbotContainer = await this.containerRepository.create(containerData);

    return endOfChatbotContainer;
>>>>>>> bcd7dbdbbcdb18154d4b3bb05a95a3fc07c76fdd
  }
}

export default CreateEndOfChatbotMessage;
