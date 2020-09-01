import { inject, injectable } from 'tsyringe';

import ISaveMessageDTO from '@modules/chatbot/dtos/ISaveMessageDTO';
import IChatbotRepository from '@modules/chatbot/repositories/IChatbotRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';

import Message, { MessageType } from '@modules/chatbot/infra/typeorm/entities/Message';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateGreetingMessage {
  constructor(
    @inject('ChatbotRepository')
    private chatbotRepository: IChatbotRepository,
    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute({ text, type, company_id }: ISaveMessageDTO): Promise<Message> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company not found');
    }

    if (type !== MessageType.GREETING) {
      throw new AppError('In this route, you must send only greeting messages');
    }

    const message = await this.chatbotRepository.create({ text, company_id, type, parent_id: null });

    return message;
  }
}

export default CreateGreetingMessage;
