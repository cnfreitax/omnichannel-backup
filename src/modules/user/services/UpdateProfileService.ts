import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/user/infra/typeorm/entities/User';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import IHashProvider from '@modules/user/providers/HashProvider/models/IHashProvider';

interface Request {
  id: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

@injectable()
export default class UpdateProfile {
  constructor(
    @inject('CompaniesRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ id, name, email, oldPassword, password }: Request): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not exist');
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== Number(id)) {
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
