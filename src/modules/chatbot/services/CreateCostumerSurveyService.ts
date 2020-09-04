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
class CreateCostumerSurvey {
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
  public async execute(messageData: ISaveMessageDTO): Promise<Message> {
    const company = await this.companyRepository.findById(messageData.company_id);
=======
  public async execute(containerData: ISaveContainerDTO): Promise<Container> {
    const company = await this.companyRepository.findById(containerData.company_id);
>>>>>>> bcd7dbdbbcdb18154d4b3bb05a95a3fc07c76fdd

    if (!company) {
      throw new AppError('Company not found');
    }

<<<<<<< HEAD
    if (messageData.parent_id) {
      const parentMessage = await this.chatbotRepository.findById(messageData.parent_id);

      if (!parentMessage) {
=======
    if (containerData.from) {
      const parentContainer = await this.containerRepository.findById(containerData.from);

      if (!parentContainer) {
>>>>>>> bcd7dbdbbcdb18154d4b3bb05a95a3fc07c76fdd
        throw new AppError('Parent message does not exist');
      }
    }

<<<<<<< HEAD
    if (messageData.type !== MessageType.SURVEY) {
      throw new AppError('Wrong message type');
    }

    const message = await this.chatbotRepository.create(messageData);

    return message;
=======
    if (containerData.type !== ContainerType.SURVEY) {
      throw new AppError('Wrong message type');
    }

    const surveyContainer = await this.containerRepository.create(containerData);

    return surveyContainer;
>>>>>>> bcd7dbdbbcdb18154d4b3bb05a95a3fc07c76fdd
  }
}

export default CreateCostumerSurvey;
