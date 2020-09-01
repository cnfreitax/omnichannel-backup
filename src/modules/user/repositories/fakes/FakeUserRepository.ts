import IUserRepository from '@modules/user/repositories/IUserRepository';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';

import User from '@modules/user/infra/typeorm/entities/User';
import IListUsersDTO from '@modules/user/dtos/IListUsersDTO';
import ISearchUsersDTO from '@modules/user/dtos/ISearchUsersDTO';

export default class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: number): Promise<User | undefined> {
    const user = this.users.find(selectedUser => selectedUser.id === id);

    return user;
  }

  public async listAllUsers({ sector_id, company_id }: IListUsersDTO): Promise<User[]> {
    let users;
    if (company_id) {
      users = this.users.filter(listUsers => {
        return listUsers.company_id === company_id;
      });
    } else if (sector_id) {
      users = this.users.filter(listUsers => {
        return listUsers.sector_id === sector_id;
      });
    } else {
      users = this.users;
    }

    return users;
  }

  public async searchUsers({ name, email }: ISearchUsersDTO): Promise<User[]> {
    let users;
    if (name) {
      users = this.users.filter(listUsers => {
        return listUsers.name === name;
      });
    } else if (email) {
      users = this.users.filter(listUsers => {
        return listUsers.email === email;
      });
    } else {
      users = this.users;
    }

    return users;
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
