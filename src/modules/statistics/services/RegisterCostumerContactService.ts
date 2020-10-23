import 'reflect-metadata';
import { ContactRecord } from '@modules/statistics/infra/typeorm/entities/Record';
import { inject, injectable } from 'tsyringe';
import { ICreateRecordDTO } from '../dtos/ICreateRecordDTO';
import { IRecordRepository } from '../repository/IRecordRepository';

@injectable()
export default class RegisterCostumerContactService {
  constructor(
    @inject('ContactRecordRepository')
    private recordRepository: IRecordRepository,
  ) {}

  async execute({ chat_type, customer_id, company_id, attendant_id, sector_id, initial_date, final_date }: ICreateRecordDTO): Promise<ContactRecord> {
    const contactRecord = await this.recordRepository.create({
      chat_type,
      customer_id,
      company_id,
      attendant_id,
      sector_id,
      initial_date,
      final_date,
    });

    return contactRecord;
  }
}
