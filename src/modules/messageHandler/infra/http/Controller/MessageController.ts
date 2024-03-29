import { Request, Response } from 'express';
import HandleClientMessageService from '@modules/messageHandler/service/HandleClientMessageService';
import IClientMessageDTO from '@modules/messageHandler/dtos/IClientMessageDTO';
import { container } from 'tsyringe';

export default class MessageController {
  public async handle(req: Request, res: Response): Promise<Response> {
    let bodyData = String(req.body);
    bodyData = bodyData.replace(/'/g, '"');
    let jsonData: IClientMessageDTO;
    jsonData = JSON.parse(bodyData);

    const handleMessage = container.resolve(HandleClientMessageService);

    await handleMessage.execute(jsonData);

    return res.sendStatus(200);
  }

  public async status(req: Request, res: Response): Promise<Response> {
    return res.sendStatus(200);
  }
}
