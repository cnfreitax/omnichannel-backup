import { ICreateRecordDTO } from '@modules/statistics/dtos/ICreateRecordDTO';

export const mockRecordParams = (): ICreateRecordDTO => ({
  chat_type: 'any_chat',
  costumer_id: 1,
  company_id: 1,
  attendant_id: 1,
  sector_id: 1,
  initial_date: new Date(),
  final_date: new Date(),
});
