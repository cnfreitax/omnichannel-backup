import { MessageType } from '../infra/typeorm/entities/Message';

export default interface ISaveMessageDTO {
  company_id: string;
  type: MessageType;
}
