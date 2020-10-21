import { RecordRepository } from '@modules/statistics/infra/typeorm/repository/RecordRepsitory';
import { container } from 'tsyringe';
import { IRecordRepository } from '../IRecordRepository';

container.registerSingleton<IRecordRepository>('ContactRecordRepository', RecordRepository);
