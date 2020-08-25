import { inject, injectable } from 'tsyringe';

import ISaveMessageDTO from '@modules/chatbot/dtos/ISaveMessageDTO';
import IChatbotRepository from '@modules/chatbot/repositories/IChatbotRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';

import Message, { MessageType } from '@modules/chatbot/infra/typeorm/entities/Message';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateEndOfChatbotMessage {
  constructor(
    @inject('ChatbotRepository')
    private chatbotRepository: IChatbotRepository,
    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(messageData: ISaveMessageDTO): Promise<Message> {
    const company = await this.companyRepository.findById(messageData.company_id);

    if (!company) {
      throw new AppError('Company not found');
    }

    if (messageData.parent_id) {
      const parentMessage = await this.chatbotRepository.findById(messageData.parent_id);

      if (!parentMessage) {
        throw new AppError('Parent message does not exist');
      }
    }

    if (messageData.type !== MessageType.END_CHATBOT) {
      throw new AppError('Wrong message type');
    }

    const message = await this.chatbotRepository.create(messageData);

    return message;
  }
}

export default CreateEndOfChatbotMessage;
