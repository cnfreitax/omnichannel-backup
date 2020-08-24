import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface Request {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ user_id, name, email, oldPassword, password }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not exist');
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdatedEmail && `${userWithUpdatedEmail.id}` !== user_id) {
      throw new AppError('Email alread in use');
    }

    if (password && !oldPassword) {
      throw new AppError('You need to inform the old password to set a new pssword');
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(oldPassword, user.password);
      if (!checkOldPassword) {
        throw new AppError('The old password is wrong');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;

    return this.userRepository.save(user);
  }
}

export default UpdateProfile;
