import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';
import Customers from '../infra/typeorm/entities/Customer';

export default interface ICustomerRepository {
  create(data: ICreateCustomerDTO): Promise<Customers>;
  findByPhone(phone: string): Promise<Customers | undefined>;
}
