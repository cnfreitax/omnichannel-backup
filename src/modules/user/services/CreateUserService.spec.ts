import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/user/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

interface IRequest {
  name: string;
  email: string;
  password: string;
  access_level: string;
}

const makeFakeUser = (): IRequest => ({
  name: 'any_name',
  email: 'any@mail.com',
  password: 'any_password',
  access_level: 'adm',
});

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('Create User Service', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });
  it('Should be able to create a new Company', async () => {
    const user = await createUser.execute(makeFakeUser());

    expect(user).toHaveProperty('id');
  });

  it('Should not be able create two Users with the same email', async () => {
    await createUser.execute(makeFakeUser());

    expect(
      createUser.execute({
        email: 'any@mail.com',
        name: 'any_name',
        password: 'any_password',
        access_level: 'adm',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
