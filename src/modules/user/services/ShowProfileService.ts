import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/user/infra/typeorm/entities/User';

import IUserRepository from '@modules/user/repositories/IUserRepository';

interface Request {
  id: string;
}

@injectable()
export default class ShowProfile {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id }: Request): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not exist');
    }

    return user;
  }
}
