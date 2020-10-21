import IAvailableUser from '@modules/user/repositories/IAvailableUser';
import IUserRepository from '@modules/user/repositories/IUserRepository';
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

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ chatId, attendantId }: IRequest): Promise<Chatline> {
    const chatSelected = await this.chatlineRepository.findById(chatId);
    const attendant = await this.availableRepository.findById(attendantId);
    if (!chatSelected || !attendant) {
      throw new AppError('Error, try again');
    }

    const user = await this.userRepository.findById(attendant.user_id);
    if (chatSelected.sector_id !== user?.sector_id) {
      throw new AppError('Sorry, you just can get chat if your are the same sector');
    }

    chatSelected.attendant_id = attendant.id;
    chatSelected.is_attended = true;
    await this.chatlineRepository.save(chatSelected);
    return chatSelected;
  }
}
