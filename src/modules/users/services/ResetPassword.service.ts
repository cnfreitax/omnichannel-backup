import { injectable, inject } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

// import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPassword {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UsersTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exist');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token Expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export default ResetPassword;
