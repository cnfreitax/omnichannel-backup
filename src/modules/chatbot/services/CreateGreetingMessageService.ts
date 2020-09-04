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
class CreateGreetingMessage {
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
  public async execute({ text, type, company_id }: ISaveMessageDTO): Promise<Message> {
=======
  public async execute({ description, type, company_id }: ISaveContainerDTO): Promise<Container> {
>>>>>>> bcd7dbdbbcdb18154d4b3bb05a95a3fc07c76fdd
    const company = await this.companyRepository.findById(company_id);
    if (!company) {
      throw new AppError('Company not found');
    }

<<<<<<< HEAD
    const greetingExists = await this.chatbotRepository.findExistingMessage({ company_id, type });
=======
    const greetingExists = await this.containerRepository.findExistingContainer({ company_id, type });
>>>>>>> bcd7dbdbbcdb18154d4b3bb05a95a3fc07c76fdd
    if (greetingExists) {
      throw new AppError('This company already has a greeting message');
    }

<<<<<<< HEAD
    if (type !== MessageType.GREETING) {
      throw new AppError('In this route, you must send only greeting messages');
    }

    const message = await this.chatbotRepository.create({ text, company_id, type, parent_id: null });

    return message;
=======
    if (type !== ContainerType.GREETING) {
      throw new AppError('Wrong message type');
    }

    const greetingContainer = await this.containerRepository.create({ description, company_id, type });

    return greetingContainer;
>>>>>>> bcd7dbdbbcdb18154d4b3bb05a95a3fc07c76fdd
  }
}

export default CreateGreetingMessage;
