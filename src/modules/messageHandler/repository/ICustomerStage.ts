import ICreateCustomerStageDTO from '../dtos/ICreateCustomerStageDto';
import CustomerStage from '../infra/typeorm/entities/CustomerStage';

export default interface ICustomerStageRepository {
  findStage(company_id: number, customer_id: number): Promise<CustomerStage | undefined>;
  updateStage(stage: CustomerStage): Promise<CustomerStage>;
  deleteStage(stage_id: number): Promise<void>;
  create(data: ICreateCustomerStageDTO): Promise<CustomerStage>;
}
