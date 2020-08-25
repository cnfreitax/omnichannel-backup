import { inject, injectable } from 'tsyringe';

import ISaveMessageDTO from '@modules/chatbot/dtos/ISaveMessageDTO';
import IChatbotRepository from '@modules/chatbot/repositories/IChatbotRepository';

import Message, { MessageType } from '@modules/chatbot/infra/typeorm/entities/Message';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateCostumerSurvey {
  constructor(
    @inject('ChatbotRepository')
    private chatbotRepository: IChatbotRepository,
  ) {}

  public async execute(messageData: ISaveMessageDTO): Promise<Message> {
    if (messageData.parent_id) {
      const parentMessage = await this.chatbotRepository.findById(messageData.parent_id);

      if (!parentMessage) {
        throw new AppError('Parent message does not exist');
      }
    }

    if (messageData.type !== MessageType.SURVEY) {
      throw new AppError('Wrong message type');
    }

    const message = await this.chatbotRepository.create(messageData);

    return message;
  }
}

export default CreateCostumerSurvey;
