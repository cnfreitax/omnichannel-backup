import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SelectChatService from '@modules/chat/service/SelectChatService';
import ExitChatService from '@modules/chat/service/ExitChatService';

export default class chatManagerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const attendantId = req.user.id;
    const { chatId } = req.body;
    const chatIdFormat = Number(chatId);
    const attendantIdFormat = Number(attendantId);
    const selectChat = container.resolve(SelectChatService);
    await selectChat.execute({ attendantId: attendantIdFormat, chatId: chatIdFormat });
    return res.status(200).json(selectChat);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { chatId } = req.body;
    const chatIdFormat = Number(chatId);
    const selectChat = container.resolve(ExitChatService);

    await selectChat.execute(chatIdFormat);
    return res.status(200).json(selectChat);
  }
}
