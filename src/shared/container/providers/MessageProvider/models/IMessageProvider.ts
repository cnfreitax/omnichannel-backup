import { ISendMessageDTO } from '../dtos/ISendDTO';

export default interface IMessageProvider {
  send(data: Array<ISendMessageDTO>): Promise<void>;
}
