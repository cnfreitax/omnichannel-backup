import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomerRepository from '../repository/ICustomerRepository';

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  private async execute(data: ICreateCustomerDTO): Promise<Customer> {
    const customerAlredyRegister = await this.customerRepository.findByPhone(data.phone);
    if (customerAlredyRegister) {
      throw new AppError('Customer alredy resgister');
    }
    const custumer = this.customerRepository.create(data);
    return custumer;
  }
}
