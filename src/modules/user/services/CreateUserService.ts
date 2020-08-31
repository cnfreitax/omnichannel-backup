import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/user/infra/typeorm/entities/User';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import IHashProvider from '@modules/user/providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  access_level: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, access_level, password }: IRequest): Promise<User> {
    const isEmailUsed = await this.userRepository.findByEmail(email);
    if (isEmailUsed) {
      throw new AppError('Email Addres Alread used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    if (access_level !== 'adm' && access_level !== 'common') {
      throw new AppError('Invalid Access Level.');
    }

    const company = await this.userRepository.create({
      name,
      email,
      access_level,
      password: hashedPassword,
    });

    return company;
  }
}
