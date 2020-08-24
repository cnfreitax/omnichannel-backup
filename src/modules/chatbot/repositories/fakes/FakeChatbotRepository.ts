import IChatbotRepository from '@modules/chatbot/repositories/IChatbotRepository';
import ISaveMessageDTO from '@modules/chatbot/dtos/ISaveMessageDTO';

import Message from '@modules/chatbot/infra/typeorm/entities/Message';

class FakeChatbotRepository implements IChatbotRepository {
  private messages: Message[] = [];

  public async create(data: ISaveMessageDTO): Promise<Message> {
    const message = new Message();

    Object.assign(message, data);

    this.messages.push(message);

    return message;
  }
}

export default FakeChatbotRepository;
