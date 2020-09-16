import ICreateCustomerStageDTO from '../dtos/ICreateCustomerStageDto';
import CustomerStage from '../infra/typeorm/entities/CustomerStage';

export default interface ICustomerStageRepository {
  findStage(company_id: number, customer_id: number): Promise<CustomerStage | undefined>;
  create(data: ICreateCustomerStageDTO): Promise<CustomerStage>;
}
