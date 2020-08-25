import IChatbotRepository from '@modules/chatbot/repositories/IChatbotRepository';
import ISaveMessageDTO from '@modules/chatbot/dtos/ISaveMessageDTO';

import Message from '@modules/chatbot/infra/typeorm/entities/Message';

class FakeChatbotRepository implements IChatbotRepository {
  private messages: Message[] = [];

  public async findById(id: string): Promise<Message | undefined> {
    const message = this.messages.find(foundMessage => foundMessage.id === Number(id));

    return message;
  }

  public async create(data: ISaveMessageDTO): Promise<Message> {
    const message = new Message();

    Object.assign(message, { id: this.messages.length + 1 }, data);

    this.messages.push(message);

    return message;
  }
}

export default FakeChatbotRepository;
