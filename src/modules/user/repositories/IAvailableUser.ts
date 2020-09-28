import ICreateAvailableUserDTO from '../dtos/ICreateAvailableUserDTO';
import Available from '../infra/typeorm/entities/Available';

export default interface IAvailableUser {
  create(data: ICreateAvailableUserDTO): Promise<Available>;
  findById(user_id: number): Promise<Available | undefined>;
  find(user_id: string, company_id: string): Promise<Available | undefined>;
  save(user: Available): Promise<void>;
  delete(user_id: number): Promise<void>;
  listAttendants(company_id: number): Promise<Available[]>;
}
