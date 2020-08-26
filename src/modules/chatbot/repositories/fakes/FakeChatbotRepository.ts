import IChatbotRepository from '@modules/chatbot/repositories/IChatbotRepository';
import ISaveMessageDTO from '@modules/chatbot/dtos/ISaveMessageDTO';
import IFindExistingMessageDTO from '@modules/chatbot/dtos/IFindExistingMessageDTO';

import Message from '@modules/chatbot/infra/typeorm/entities/Message';

class FakeChatbotRepository implements IChatbotRepository {
  private messages: Message[] = [];

  public async findById(id: string): Promise<Message | undefined> {
    const message = this.messages.find(foundMessage => foundMessage.id === Number(id));

    return message;
  }

  public async create({ company_id, parent_id, text, type }: ISaveMessageDTO): Promise<Message> {
    const message = new Message();

    Object.assign(message, { id: this.messages.length + 1, company_id: Number(company_id), parent_id, text, type });

    this.messages.push(message);

    return message;
  }

  public async findExistingMessage({ company_id, type }: IFindExistingMessageDTO): Promise<Message | undefined> {
    const message = this.messages.find(foundMessage => foundMessage.company_id === Number(company_id) && foundMessage.type === type);
    // console.log(this.messages, company_id, type, message);

    return message;
  }
}

export default FakeChatbotRepository;
