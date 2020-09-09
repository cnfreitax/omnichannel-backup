import FakeHashProvider from '@modules/user/providers/HashProvider/fakes/FakeHashProvider';
import ListUsersService from './ListUsersService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import ICreateUsertDTO from '../dtos/ICreateUserDTO';

let fakeUserRepository: FakeUserRepository;
let listUser: ListUsersService;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

const makeUser = (): ICreateUsertDTO => ({
  name: 'any_name',
  email: 'any@mail.com',
  password: 'any_password',
  access_level: 'adm',
});

describe('ListUsers Service', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    listUser = new ListUsersService(fakeUserRepository);
  });
  test('Should list all users if company_id or sector_id not provided', async () => {
    await createUser.execute(makeUser());
    const users = await listUser.execute({});
    expect(users).toHaveLength(1);
  });
});
