import IAvailableUser from '@modules/user/repositories/IAvailableUser';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Chatline from '../infra/typeorm/entities/Chatline';
import IChatlineRepository from '../repository/IChatlineRepository';

interface IRequest {
  attendantId: number;
  chatId: number;
}

@injectable()
export default class SelectChatService {
  constructor(
    @inject('ChatlineRepository')
    private chatlineRepository: IChatlineRepository,
    @inject('AvailableUser')
    private availableRepository: IAvailableUser,
  ) {}

  public async execute({ chatId, attendantId }: IRequest): Promise<Chatline> {
    const chatSelected = await this.chatlineRepository.findById(chatId);
    const attendant = await this.availableRepository.findById(attendantId);
    if (!chatSelected || attendant) {
      throw new AppError('Error, try again');
    }

    chatSelected.attendant_id = attendantId;
    chatSelected.is_attended = true;
    await this.chatlineRepository.save(chatSelected);
    return chatSelected;
  }
}
