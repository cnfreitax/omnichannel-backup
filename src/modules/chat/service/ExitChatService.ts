import ICustomerStageRepository from '@modules/messageHandler/repository/ICustomerStage';
import { IRecordRepository } from '@modules/statistics/repository/IRecordRepository';
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

    @inject('ContactRecordRepository')
    private recordRepository: IRecordRepository,
  ) {}

  public async execute(chatId: number): Promise<void> {
    const chatSelected = await this.chatlineRepository.findById(chatId);
    if (!chatSelected) {
      throw new AppError('Error, try again');
    }

    await this.chatlineRepository.deleteChatline(chatId);

    const { customer_id, company_id, sector_id, attendant_id, created_at } = chatSelected;
    console.log(company_id);

    await this.recordRepository.create({
      chat_type: 'chat',
      company_id,
      customer_id,
      attendant_id,
      sector_id,
      initial_date: new Date(),
      final_date: created_at,
    });

    const customerStage = await this.customerStageRepository.findStage(company_id, customer_id);
    if (!customerStage) {
      throw new AppError('Stage not found');
    }
    await this.customerStageRepository.deleteStage(customerStage.id);
  }
}
