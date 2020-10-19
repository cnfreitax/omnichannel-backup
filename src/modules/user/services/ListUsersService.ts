import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  company_id?: number;
  sector_id?: number;
}

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ company_id, sector_id }: IRequest): Promise<User[]> {
    let users: User[];

    if (sector_id) {
      users = await this.userRepository.listAllUsers({ sector_id });
    } else if (company_id) {
      users = await this.userRepository.listAllUsers({ company_id });
    } else {
      users = await this.userRepository.listAllUsers({});
    }

    return users;
  }
}
