import Axios from 'axios';
import { ISendMessageDTO } from '../dtos/ISendDTO';
import IMessageProvider from '../models/IMessageProvider';

export default class SendMessageProvider implements IMessageProvider {
  public async send({ token, Telephone, codCampaign, Message }: ISendMessageDTO): Promise<void> {
    const requestJson = [
      {
        token,
        codCampaign,
        Telephone,
        Message,
      },
    ];

    await Axios.post(process.env.WEB_HOOK_RESPONSE || 'default', requestJson);
  }
}
