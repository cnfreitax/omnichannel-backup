import { ISendMessageDTO } from '../dtos/ISendDTO';

export default interface IMessageProvider {
  send(data: ISendMessageDTO): Promise<void>;
}
