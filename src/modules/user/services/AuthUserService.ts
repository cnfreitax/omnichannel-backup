import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import User from '@modules/user/infra/typeorm/entities/User';
import IHashProvider from '@modules/user/providers/HashProvider/models/IHashProvider';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import IAvailableUser from '../repositories/IAvailableUser';

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

    @inject('AvailableUser')
    private availableUser: IAvailableUser,
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

    if (user.access_level === 'common') {
      if (!user.company_id) {
        throw new AppError('User needs to register with a company to login');
      }
      await this.availableUser.create({
        company_id: user.company_id,
        user_id: user.id,
      });
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
