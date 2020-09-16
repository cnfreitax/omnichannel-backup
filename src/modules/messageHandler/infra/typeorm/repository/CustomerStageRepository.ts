import ICreateCustomerStageDTO from '@modules/messageHandler/dtos/ICreateCustomerStageDto';
import ICustomerStageRepository from '@modules/messageHandler/repository/ICustomerStage';
import { Repository, getRepository } from 'typeorm';
import CustomerStage from '../entities/CustomerStage';

export default class CustomerStageRepository implements ICustomerStageRepository {
  private ormRepository: Repository<CustomerStage>;

  constructor() {
    this.ormRepository = getRepository(CustomerStage);
  }

  public async findStage(company_id: number, customer_id: number): Promise<CustomerStage | undefined> {
    const customerStage = await this.ormRepository.findOne({
      where: {
        company_id,
        customer_id,
      },
    });
    return customerStage;
  }

  public async create(data: ICreateCustomerStageDTO): Promise<CustomerStage> {
    const customerStage = this.ormRepository.create(data);
    await this.ormRepository.save(customerStage);
    return customerStage;
  }
}
