import { Request, Response } from 'express';
import HandleClientMessageService from '@modules/messageHandler/service/HandleClientMessageService';
import IClientMessageDTO from '@modules/messageHandler/dtos/IClientMessageDTO';
import { container } from 'tsyringe';

export default class MessageController {
  public async handle(req: Request, res: Response): Promise<Response> {
    console.log('OI MESSAGE');
    console.log(req.body);
    let bodyData = String(req.body);
    bodyData = bodyData.replace(/'/g, '"');
    let jsonData: IClientMessageDTO;
    jsonData = JSON.parse(bodyData);
    console.log(jsonData);

    const handleMessage = container.resolve(HandleClientMessageService);

    handleMessage.execute(jsonData);

    return res.send(200).json({ ok: 'ok' });
  }
}
