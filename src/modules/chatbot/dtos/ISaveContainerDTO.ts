import { ContainerType } from '../infra/typeorm/entities/Container';

export default interface ISaveContainerDTO {
  from?: number;
  to?: number;
  content?: JSON;
  company_id: number;
  description: string;
  type: ContainerType;
  expects_input?: boolean;
}
