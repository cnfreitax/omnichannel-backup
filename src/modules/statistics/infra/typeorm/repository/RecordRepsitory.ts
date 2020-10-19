import { ICreateRecordDTO } from '@modules/statistics/dtos/ICreateRecordDTO';
import { IRecordRepository } from '@modules/statistics/repository/IRecordRepository';
import { getRepository, Repository } from 'typeorm';
import { Record } from '../entities/Record';

export class RecordRepository implements IRecordRepository {
  private ormRepository: Repository<Record>;

  constructor() {
    this.ormRepository = getRepository(Record);
  }

  public async create(params: ICreateRecordDTO): Promise<Record> {
    const record = this.ormRepository.create(params);
    await this.ormRepository.save(record);
    return record;
  }
}
