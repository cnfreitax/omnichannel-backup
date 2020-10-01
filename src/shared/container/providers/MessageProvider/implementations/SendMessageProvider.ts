import Axios from 'axios';
import { ISendMessageDTO } from '../dtos/ISendMessageDTO';
import { ISendAttendantMessageDTO } from '../dtos/ISendAttendantMessageDTO';
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

    await Axios.post(process.env.WEB_HOOK_RESPONSE || 'default', messagesToSend);
  }

  public async sendToAttendant(data: ISendAttendantMessageDTO): Promise<void> {
    let messageToSend = data;

    // 'https://omnichannel-union.herokuapp.com/'
    await Axios.post(process.env.UNION_CHAT || 'default', messageToSend);
  }
}
