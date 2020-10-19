import { ICreateRecordDTO } from '../dtos/ICreateRecordDTO';
import { ContactRecord } from '../infra/typeorm/entities/Record';
import { IRecordRepository } from '../repository/IRecordRepository';
import { mockRecord } from './models';

export const mockRecordRepository = (): IRecordRepository => {
  class RecordRepositoryStub implements IRecordRepository {
    async create(_params: ICreateRecordDTO): Promise<ContactRecord> {
      return Promise.resolve(mockRecord());
    }
  }
  return new RecordRepositoryStub();
};
