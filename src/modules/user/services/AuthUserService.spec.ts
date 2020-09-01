import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/user/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import AuthUser from './AuthUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authUser: AuthUser;
let createUser: CreateUserService;

describe('User SignUp', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    authUser = new AuthUser(fakeUserRepository, fakeHashProvider);
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('Should be able to user signUp', async () => {
    await createUser.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
      access_level: 'adm',
    });

    const response = await authUser.execute({
      email: 'jj@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('shoud not be able to login with incorrect email', async () => {
    await createUser.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
      access_level: 'adm',
    });

    expect(
      authUser.execute({
        email: 'jjj@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to login with incorrect password', async () => {
    await createUser.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
      access_level: 'adm',
    });

    expect(
      authUser.execute({
        email: 'jj@email.com',
        password: '1234564',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
