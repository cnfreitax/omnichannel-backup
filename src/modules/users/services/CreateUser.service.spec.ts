import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import CreateUserService from './CreateUser.service';

describe('CreateUser', () => {
  it('shoud br able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeCacheProvider = new FakeCacheProvider();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider, fakeCacheProvider);

    const user = await createUserService.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('shoud not be able to create two users with the same email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeCacheProvider = new FakeCacheProvider();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider, fakeCacheProvider);

    await createUser.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    expect(
      createUser.execute({
        email: 'jj@email.com',
        name: 'Eduardo',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
