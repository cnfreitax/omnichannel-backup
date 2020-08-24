import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import UpdateUserAvatar from './UpdateUserAvatar.service';

describe('upadateAvatarService', () => {
  it('shoud br able to save an avatar', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository();
    const updateUserAvatar = new UpdateUserAvatar(fakeStorageProvider, fakeUserRepository);

    const user = await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('shoud be able to replace avatar', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository();
    const updateUserAvatar = new UpdateUserAvatar(fakeStorageProvider, fakeUserRepository);

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toBeCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });

  it('shoud not be able to create avatar', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository();
    const updateUserAvatar = new UpdateUserAvatar(fakeStorageProvider, fakeUserRepository);

    expect(
      updateUserAvatar.execute({
        user_id: 'anyone',
        avatarFileName: 'avatar2.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
