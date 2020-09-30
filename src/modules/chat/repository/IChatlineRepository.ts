import ICreateChatlineDTO from '../dtos/ICreateChatlineDTO';
import Chatline from '../infra/typeorm/entities/Chatline';

export default interface IChatlineRepository {
  findById(id: number): Promise<Chatline | undefined>;
  findChatline(company_id: number, customer_id: number): Promise<Chatline | undefined>;
  deleteChatline(chatline_id: number): Promise<void>;
  create(data: ICreateChatlineDTO): Promise<Chatline>;
  save(chataInfo: Chatline): Promise<Chatline>;
  findByAttendant(attendantId: number): Promise<Chatline | undefined>;
}
