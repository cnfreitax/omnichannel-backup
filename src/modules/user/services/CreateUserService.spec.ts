import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/user/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import CreateUser from './CreateUserService';

describe('Create User Service', () => {
  it('Should be able to create a new Company', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUser(fakeUserRepository, fakeHashProvider);

    const user = await createUser.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
      access_level: 'adm',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able create two Company with the same email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUser(fakeUserRepository, fakeHashProvider);

    await createUser.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
      access_level: 'adm',
    });

    expect(
      createUser.execute({
        email: 'jj@email.com',
        name: 'Eduardo',
        password: '123456',
        access_level: 'adm',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
