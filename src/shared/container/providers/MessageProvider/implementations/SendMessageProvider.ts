import Axios from 'axios';
import { ISendMessageDTO } from '../dtos/ISendDTO';
import IMessageProvider from '../models/IMessageProvider';

export default class SendMessageProvider implements IMessageProvider {
  public async send(data: Array<ISendMessageDTO>): Promise<void> {
    await Axios.post(process.env.WEB_HOOK_RESPONSE || 'default', data);
  }
}
