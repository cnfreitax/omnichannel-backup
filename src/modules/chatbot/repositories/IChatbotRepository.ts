import ISaveMessageDTO from '@modules/chatbot/dtos/ISaveMessageDTO';
import Message from '@modules/chatbot/infra/typeorm/entities/Message';

export default interface IChatbotRepository {
  findById(id: number): Promise<Message | undefined>;
  create(data: ISaveMessageDTO): Promise<Message>;
}
