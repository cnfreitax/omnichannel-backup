import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import ShowProfileService from './ShowProfile.service';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('updateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('shoud be able to show profile', async () => {
    const user = await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Eduardo');
    expect(profile.email).toBe('jj@email.com');
  });

  it('shoud be not able to show a non-existing profile', async () => {
    await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    await expect(
      showProfile.execute({
        user_id: 'non-ecxisting-user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
