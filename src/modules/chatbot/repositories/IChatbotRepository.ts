import ISaveMessageDTO from '@modules/chatbot/dtos/ISaveMessageDTO';
import IFindExistingMessageDTO from '@modules/chatbot/dtos/IFindExistingMessageDTO';
import Message from '@modules/chatbot/infra/typeorm/entities/Message';

export default interface IChatbotRepository {
  findExistingMessage(data: IFindExistingMessageDTO): Promise<Message | undefined>;
  findById(id: string): Promise<Message | undefined>;
  create(data: ISaveMessageDTO): Promise<Message>;
}
