import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';
import Customer from '../infra/typeorm/entities/Customer';

export default interface ICustomerRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
  findByPhone(phone: string): Promise<Customer | undefined>;
  findById(id: number): Promise<Customer | undefined>;
}
