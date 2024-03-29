import { getRepository, Repository } from 'typeorm';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import User from '@modules/user/infra/typeorm/entities/User';
import IListUsersDTO from '@modules/user/dtos/IListUsersDTO';
import ISearchUserDTO from '@modules/user/dtos/ISearchUsersDTO';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(Number(id));

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async searchUsers(searchParams: ISearchUserDTO): Promise<User[]> {
    const users = await this.ormRepository.find({ where: searchParams });

    return users;
  }

  public async listAllUsers(listParams: IListUsersDTO): Promise<User[]> {
    const users = await this.ormRepository.find({ where: listParams });
    return users;
  }

  public async create(dataUser: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(dataUser);
    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
