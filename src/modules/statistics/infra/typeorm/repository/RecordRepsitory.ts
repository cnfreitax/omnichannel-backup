import { ICreateRecordDTO } from '@modules/statistics/dtos/ICreateRecordDTO';
import { IRecordRepository } from '@modules/statistics/repository/IRecordRepository';
import { getRepository, Repository } from 'typeorm';
import { ContactRecord } from '../entities/Record';

export class RecordRepository implements IRecordRepository {
  private ormRepository: Repository<ContactRecord>;

  constructor() {
    this.ormRepository = getRepository(ContactRecord);
  }

  public async create(params: ICreateRecordDTO): Promise<ContactRecord> {
    const contactRecord = this.ormRepository.create(params);
    await this.ormRepository.save(contactRecord);
    return contactRecord;
  }
}
