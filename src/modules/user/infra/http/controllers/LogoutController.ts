import { Request, Response } from 'express';
import { container } from 'tsyringe';
import LogoutUserService from '@modules/user/services/LogoutCommonUserService';

export default class LogoutUserController {
  public async delete(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const authUserService = container.resolve(LogoutUserService);
    await authUserService.execute(Number(user_id));

    return res.sendStatus(204);
  }
}
