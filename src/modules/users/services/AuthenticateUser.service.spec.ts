import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUser.service';
import AuthenticateUserService from './AuthenticateUser.service';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('authUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('shoud br able to auth', async () => {
    await createUser.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'jj@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    // expect(response).toHaveProperty('token');
  });

  it('shoud not be able to login with incorrect email', async () => {
    await createUser.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'jjj@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to login with incorrect password', async () => {
    await createUser.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'jj@email.com',
        password: '1234564',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
