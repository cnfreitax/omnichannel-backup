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

  test('Should list users from company is sector_id is provided', async () => {
    const user = await createUser.execute(makeUser());
    user.sector_id = 1;
    const userFromSector = await listUser.execute({ sector_id: 1 });
    expect(user.sector_id).toBe(1);
    expect(userFromSector).toHaveLength(1);
  });

  test('Should list users from company is company_id is provided', async () => {
    const user = await createUser.execute(makeUser());
    user.company_id = 2;
    const userFromSector = await listUser.execute({ company_id: 2 });
    expect(user.company_id).toBe(2);
    expect(userFromSector).toHaveLength(1);
  });
});
