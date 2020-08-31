import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import User from '@modules/user/infra/typeorm/entities/User';
import IHashProvider from '@modules/user/providers/HashProvider/models/IHashProvider';
import IUserRepository from '@modules/user/repositories/IUserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class AuthUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('incorrect email/password', 401);
    }

    const matchPasswordProvided = await this.hashProvider.compareHash(password, user.password);

    if (!matchPasswordProvided) {
      throw new AppError('incorrect email/password', 401);
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign(
      {
        access_level: user.access_level,
      },
      secret,
      {
        subject: `${user.id}`,
        expiresIn,
      },
    );

    return { user, token };
  }
}
