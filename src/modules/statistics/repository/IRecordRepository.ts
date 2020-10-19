import { ICreateRecordDTO } from '../dtos/ICreateRecordDTO';
import { Record } from '../infra/typeorm/entities/Record';

export interface IRecordRepository {
  create(params: ICreateRecordDTO): Promise<Record>;
}
