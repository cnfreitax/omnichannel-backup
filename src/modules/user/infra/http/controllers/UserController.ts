import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/user/services/CreateUserService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const { access_level } = req.params;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      access_level,
      password,
    });

    return res.json(classToClass(user));
  }
}
