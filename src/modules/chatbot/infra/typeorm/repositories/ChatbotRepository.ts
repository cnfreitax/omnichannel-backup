import { getRepository, Repository } from 'typeorm';

import IChatbotRepository from '@modules/chatbot/repositories/IChatbotRepository';

import Message from '@modules/chatbot/infra/typeorm/entities/Message';
import ISaveMessageDTO from '@modules/chatbot/dtos/ISaveMessageDTO';

class ChatbotRepository implements IChatbotRepository {
  private ormRepository: Repository<Message>;

  constructor() {
    this.ormRepository = getRepository(Message);
  }

  public async create(messageData: ISaveMessageDTO): Promise<Message> {
    const message = this.ormRepository.create(messageData);

    await this.ormRepository.save(message);

    return message;
  }
}

export default ChatbotRepository;
