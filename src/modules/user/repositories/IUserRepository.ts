import User from '@modules/user/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import IListUsersDTO from '../dtos/IListUsersDTO';
import ISearchUsersDTO from '../dtos/ISearchUsersDTO';

export default interface IUserRepository {
  findById(id: number): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  searchUsers(searchParams: ISearchUsersDTO): Promise<User[]>;
  listAllUsers(parametrer: IListUsersDTO): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
