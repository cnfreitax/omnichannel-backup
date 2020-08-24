import { MessageType } from '../infra/typeorm/entities/Message';

export default interface ISaveMessageDTO {
  parent_id: number;
  company_id: number;
  text: string;
  type: MessageType;
}
