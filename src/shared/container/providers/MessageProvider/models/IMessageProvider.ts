import { ISendMessageDTO } from '../dtos/ISendMessageDTO';
import { ISendAttendantMessageDTO } from '../dtos/ISendAttendantMessageDTO';

export default interface IMessageProvider {
  send(data: Array<ISendMessageDTO>): Promise<void>;
  sendToAttendant(data: ISendAttendantMessageDTO): Promise<void>;
}
