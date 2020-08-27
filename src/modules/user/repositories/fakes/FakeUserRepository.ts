import IUserRepository from '@modules/user/repositories/IUserRepository';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';

import User from '@modules/user/infra/typeorm/entities/User';

export default class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(selectedUser => `${selectedUser.id}` === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(selectedUser => selectedUser.email === email);

    return user;
  }

  public async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    const date = new Date();
    const id = date.getTime() + Math.round(Math.random() * 100);

    Object.assign(user, { id, email, password, name });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(selectedUser => selectedUser.id === user.id);

    this.users[index] = user;

    return user;
  }
}
