import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateOptionService from '@modules/chatbot/services/UpdateOptionService';
import AppError from '@shared/errors/AppError';

export default class UpdateOptionController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { description, to } = req.body;
      const { optionId } = req.params;
      const formatOptionId = Number(optionId);

      const updateOption = container.resolve(UpdateOptionService);

      const option = await updateOption.execute({ description, to, optionId: formatOptionId });

      return res.json(option);
    } catch (errr) {
      throw new AppError('Server error', 500);
    }
  }
}
