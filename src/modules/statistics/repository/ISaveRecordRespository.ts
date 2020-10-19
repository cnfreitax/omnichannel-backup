import { ICreateRecordDTO } from '../dtos/ICreateRecordDTO';
import { ContactRecord } from '../infra/typeorm/entities/Record';

export interface ISaveRecordRepository {
  create(params: ICreateRecordDTO): Promise<ContactRecord>;
}
