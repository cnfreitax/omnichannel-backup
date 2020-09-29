import { Repository, getRepository } from 'typeorm';
import ICustomerRepository from '@modules/customer/repository/ICustomerRepository';
import ICreateCustomerDTO from '@modules/customer/dtos/ICreateCustomerDTO';
import Customer from '../entities/Customer';

export default class CustomerRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findByPhone(phone: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({ where: { phone } });
    return customer;
  }

  public async create(data: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create(data);
    await this.ormRepository.save(customer);
    return customer;
  }

  public async findById(id: number): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({ where: { id } });
    return customer;
  }
}
