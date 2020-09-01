import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/user/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let updateProfile: UpdateProfileService;

describe('Update Profile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();
    updateProfile = new UpdateProfileService(fakeUserRepository, fakeHashProvider);
  });

  it('Should be able update profile', async () => {
    const user = await fakeUserRepository.create({
      email: 'any_@mail.com',
      name: 'any_mail',
      password: '123',
      access_level: 'adm',
    });

    const updatedUser = await updateProfile.execute({
      id: user.id,
      name: 'any_new_name',
      email: 'any_new@mail.com',
    });

    expect(updatedUser.name).toBe('any_new_name');
    expect(updatedUser.email).toBe('any_new@mail.com');
  });

  it('shoud be not able to update a non-existing profiler', async () => {
    await fakeUserRepository.create({
      email: 'any@mail.com',
      name: 'any_name',
      password: 'password',
      access_level: 'adm',
    });

    await expect(
      updateProfile.execute({
        id: 999,
        name: 'any_name',
        email: 'any@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update email whit an existent email from other user ', async () => {
    await fakeUserRepository.create({
      email: 'any@mail.com',
      name: 'any_mail',
      password: '123',
      access_level: 'adm',
    });

    const user = await fakeUserRepository.create({
      email: 'any@mail.com',
      name: 'any_second_name',
      password: '123',
      access_level: 'adm',
    });

    await expect(
      updateProfile.execute({
        id: user.id,
        email: 'any@mail.com',
        name: 'any_name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update password', async () => {
    const user = await fakeUserRepository.create({
      email: 'any@mail.com',
      name: 'any_name',
      password: 'old_password',
      access_level: 'adm',
    });

    const updatedUser = await updateProfile.execute({
      id: user.id,
      email: 'any@mail.com',
      name: 'any_name',
      password: 'new_password',
      oldPassword: 'old_password',
    });

    expect(updatedUser.password).toBe('new_password');
  });

  it('Should not be able to update password without an old password', async () => {
    const user = await fakeUserRepository.create({
      email: 'any@mail.com',
      name: 'any_name',
      password: 'old_password',
      access_level: 'adm',
    });

    await expect(
      updateProfile.execute({
        id: user.id,
        email: 'any@mail.com',
        name: 'any_name',
        password: 'old_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      email: 'any@mail.com',
      name: 'any_name',
      password: 'old_password',
      access_level: 'adm',
    });

    await expect(
      updateProfile.execute({
        id: user.id,
        email: 'any@mail.com',
        name: 'any_name',
        password: 'new_password',
        oldPassword: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
