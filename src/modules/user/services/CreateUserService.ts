import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/user/infra/typeorm/entities/User';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import IHashProvider from '@modules/user/providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
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

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const isEmailUsed = await this.userRepository.findByEmail(email);
    if (isEmailUsed) {
      throw new AppError('Email Addres Alread used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const company = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return company;
  }
}
