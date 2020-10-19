import { ContactRecord } from '@modules/statistics/infra/typeorm/entities/Record';

export const mockRecord = (): ContactRecord => ({
  id: 1,
  chat_type: 'any_chat',
  attendant_id: 1,
  company_id: 1,
  sector_id: 1,
  costumer_id: 1,
  initial_date: new Date(),
  final_date: new Date(),
  created_at: new Date(),
  updated_at: new Date(),
});
