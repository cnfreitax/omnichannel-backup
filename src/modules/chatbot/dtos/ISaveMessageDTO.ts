import { MessageType } from '../infra/typeorm/entities/Message';

export default interface ISaveMessageDTO {
  parent_id?: string | null;
  company_id: string;
  text: string;
  type: MessageType;
}
