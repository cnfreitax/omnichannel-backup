import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SelectChatService from '@modules/chat/service/SelectChatService';
import ExitChatService from '@modules/chat/service/ExitChatService';

export default class ChatMenagerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const attendantId = req.user.id;
    const { chatId } = req.body;
    const selectChat = container.resolve(SelectChatService);
    await selectChat.execute({ attendantId, chatId });
    return res.send(200).json(selectChat);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { chatId } = req.params;
    const chatIdFormat = Number(chatId);
    const selectChat = container.resolve(ExitChatService);

    await selectChat.execute(chatIdFormat);
    return res.send(200).json(selectChat);
  }
}
