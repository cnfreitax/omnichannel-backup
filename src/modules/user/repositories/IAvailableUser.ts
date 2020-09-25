import ICreateAvailableUserDTO from '../dtos/ICreateAvailableUserDTO';
import Available from '../infra/typeorm/entities/Available';

export default interface IAvailableUser {
  create(data: ICreateAvailableUserDTO): Promise<Available>;
  find(user_id: string, company_id: string): Promise<Available | undefined>;
  save(user: Available): Promise<void>;
}
