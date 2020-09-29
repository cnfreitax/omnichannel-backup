import ICreateChatlineDTO from '../dtos/ICreateChatlineDTO';
import Chatline from '../infra/typeorm/entities/Chatline';

export default interface IChatlineRepository {
  findChatline(company_id: number, customer_id: number): Promise<Chatline | undefined>;
  deleteChatline(chatline_id: number): Promise<void>;
  create(data: ICreateChatlineDTO): Promise<Chatline>;
  findByAttendant(attendantId: number): Promise<Chatline | undefined>;
}
