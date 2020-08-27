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

  public async execute({ company_id, text, type, parent_id }: ISaveMessageDTO): Promise<Message> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company not found');
    }

    const endChatbotMessageExists = await this.chatbotRepository.findExistingMessage({ company_id, type });
    if (endChatbotMessageExists) {
      throw new AppError('This company already has a end of chatbot message');
    }

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
  }
}

export default CreateEndOfChatbotMessage;
