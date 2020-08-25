import { getRepository, Repository } from 'typeorm';

import IChatbotRepository from '@modules/chatbot/repositories/IChatbotRepository';

import Message from '@modules/chatbot/infra/typeorm/entities/Message';
import ISaveMessageDTO from '@modules/chatbot/dtos/ISaveMessageDTO';

class ChatbotRepository implements IChatbotRepository {
  private ormRepository: Repository<Message>;

  constructor() {
    this.ormRepository = getRepository(Message);
  }

  public async findById(id: string): Promise<Message | undefined> {
    const message = await this.ormRepository.findOne(Number(id));

    return message;
  }

  public async create({ company_id, text, type, parent_id }: ISaveMessageDTO): Promise<Message> {
    const message = this.ormRepository.create({
      company_id: Number(company_id),
      parent_id: parent_id ? Number(parent_id) : undefined,
      text,
      type,
    });

    await this.ormRepository.save(message);

    return message;
  }
}

export default ChatbotRepository;
