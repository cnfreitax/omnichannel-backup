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
    const selectChatService = container.resolve(SelectChatService);
    const selectChat = await selectChatService.execute({ attendantId: attendantIdFormat, chatId: chatIdFormat });
    return res.json(selectChat);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { chatId } = req.body;
    const chatIdFormat = Number(chatId);
    const exitChatService = container.resolve(ExitChatService);

    const exitChat = await exitChatService.execute(chatIdFormat);
    return res.json(exitChat);
  }
}
