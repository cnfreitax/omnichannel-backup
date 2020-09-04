import { ContainerType } from '../infra/typeorm/entities/Container';

export default interface IFindExistingContainerDTO {
  company_id: number;
  type: ContainerType;
}
