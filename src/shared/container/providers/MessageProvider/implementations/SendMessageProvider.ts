import Axios from 'axios';
import { ISendMessageDTO } from '../dtos/ISendDTO';
import IMessageProvider from '../models/IMessageProvider';

export default class SendMessageProvider implements IMessageProvider {
  public async send(data: Array<ISendMessageDTO>): Promise<void> {
    let messagesToSend = data;

    messagesToSend.unshift({
      token: data[0].token,
      Telephone: data[0].Telephone,
      codCampaign: data[0].codCampaign,
      Message: '',
    });

    await Axios.post(process.env.WEB_HOOK_RESPONSE || 'default', data);
  }
}
