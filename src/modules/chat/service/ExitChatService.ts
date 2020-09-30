import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IChatlineRepository from '../repository/IChatlineRepository';

@injectable()
export default class ExitChatService {
  constructor(
    @inject('ChatlineRepository')
    private chatlineRepository: IChatlineRepository,
  ) {}

  public async execute(chatId: number): Promise<void> {
    const chatSelected = await this.chatlineRepository.findById(chatId);
    if (!chatSelected) {
      throw new AppError('Error, try again');
    }
    await this.chatlineRepository.deleteChatline(chatId);
  }
}
