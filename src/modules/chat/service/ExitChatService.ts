import ICustomerStageRepository from '@modules/messageHandler/repository/ICustomerStage';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IChatlineRepository from '../repository/IChatlineRepository';

@injectable()
export default class ExitChatService {
  constructor(
    @inject('ChatlineRepository')
    private chatlineRepository: IChatlineRepository,

    @inject('CustomerStageRepository')
    private customerStageRepository: ICustomerStageRepository,
  ) {}

  public async execute(chatId: number): Promise<void> {
    const chatSelected = await this.chatlineRepository.findById(chatId);
    if (!chatSelected) {
      throw new AppError('Error, try again');
    }
    await this.chatlineRepository.deleteChatline(chatId);

    const costumer = chatSelected.customer_id;
    const company = chatSelected.company_id;

    const customerStage = await this.customerStageRepository.findStage(company, costumer);
    if (!customerStage) {
      throw new AppError('Stage not found');
    }
    await this.customerStageRepository.deleteStage(customerStage.id);
  }
}
