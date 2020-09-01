import { injectable, inject } from 'tsyringe';

import User from '@modules/user/infra/typeorm/entities/User';

import IUserRepository from '@modules/user/repositories/IUserRepository';

interface IRequest {
  name?: string;
  email?: string;
}

@injectable()
export default class SearchUsers {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ email, name }: IRequest): Promise<User[]> {
    let users: User[] = [];

    if (email && name) {
      users = await this.userRepository.searchUsers({ email, name });
    } else if (email && !name) {
      users = await this.userRepository.searchUsers({ email });
    } else if (!email && name) {
      users = await this.userRepository.searchUsers({ name });
    }

    return users;
  }
}
