import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SelectChatService from '@modules/chat/service/SelectChatService';

export default class SelectChatController {
  public async create(req: Request, res: Response): Promise<Response> {
    const attendantId = req.user.id;
    const { chatId } = req.body;
    const selectChat = container.resolve(SelectChatService);
    await selectChat.execute({ attendantId, chatId });
    return res.send(200).json(selectChat);
  }
}
