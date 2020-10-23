import { Request, Response } from 'express';
import { container } from 'tsyringe';
import HandleMessageChat from '@modules/chat/service/HandleMessageChat';

export default class MessageChatController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const attendantId = req.user.id;
    const { message } = req.body;
    const handleMessage = container.resolve(HandleMessageChat);
    await handleMessage.execute({ message, attendantId });
    return res.sendStatus(204);
  }

  public async status(req: Request, res: Response): Promise<Response> {
    return res.sendStatus(200);
  }
}
