import ICreateChatlineDTO from '@modules/chat/dtos/ICreateChatlineDTO';
import IChatlineRepository from '@modules/chat/repository/IChatlineRepository';
import { Repository, getRepository } from 'typeorm';
import Chatline from '../entities/Chatline';

export default class CustomerStageRepository implements IChatlineRepository {
  private ormRepository: Repository<Chatline>;

  constructor() {
    this.ormRepository = getRepository(Chatline);
  }

  public async findChatline(company_id: number, chatline_id: number): Promise<Chatline | undefined> {
    const chatline = await this.ormRepository.findOne({
      where: {
        company_id,
        chatline_id,
      },
    });
    return chatline;
  }

  public async create(data: ICreateChatlineDTO): Promise<Chatline> {
    const chatline = this.ormRepository.create(data);
    await this.ormRepository.save(chatline);
    return chatline;
  }

  public async deleteChatline(chatline_id: number): Promise<void> {
    await this.ormRepository.delete(chatline_id);
  }

  public async findByAttendant(attendantId: number): Promise<Chatline | undefined> {
    const chat = await this.ormRepository.findOne({ where: { attendant_id: attendantId } });
    return chat;
  }
}
