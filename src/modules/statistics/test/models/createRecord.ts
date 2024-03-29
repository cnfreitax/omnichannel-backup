import { ICreateRecordDTO } from '@modules/statistics/dtos/ICreateRecordDTO';

export const mockRecordParams = (): ICreateRecordDTO => ({
  customer_id: 1,
  company_id: 1,
  attendant_id: 1,
  sector_id: 1,
  initial_date: new Date(),
  final_date: new Date(),
});
