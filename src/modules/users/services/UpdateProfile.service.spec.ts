// import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import UpdateProfileService from './UpdateProfile.service';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let updateProfile: UpdateProfileService;

describe('updateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();
    updateProfile = new UpdateProfileService(fakeUserRepository, fakeHashProvider);
  });

  it('shoud br able to update profiler', async () => {
    const user = await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'odraude',
      email: 'eduardo@gmail.com',
    });

    expect(updatedUser.name).toBe('odraude');
    expect(updatedUser.email).toBe('eduardo@gmail.com');
  });

  it('shoud be not able to update a non-existing profiler', async () => {
    await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: 'no-nexisting-id',
        name: 'odraude',
        email: 'eduardo@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud be not able to update email whit an existent email from other user ', async () => {
    await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      email: 'edu@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'jj@email.com',
        name: 'Eduardo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud be able to update password', async () => {
    const user = await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123123',
      oldPassword: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('shoud be not able to update password without an old password', async () => {
    const user = await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'jj@email.com',
        name: 'Eduardo',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud be not able to update password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'jj@email.com',
        name: 'Eduardo',
        password: '123123',
        oldPassword: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
