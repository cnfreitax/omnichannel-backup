import ISaveMessageDTO from '@modules/chatbot/dtos/ISaveMessageDTO';
import Message from '@modules/chatbot/infra/typeorm/entities/Message';

export default interface IChatbotRepository {
  save(data: ISaveMessageDTO): Promise<Message>;
}
