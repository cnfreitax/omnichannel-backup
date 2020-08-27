import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('Update Profile', () => {
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
      id: `${user.id}`,
    });

    expect(profile.name).toBe('Eduardo');
    expect(profile.email).toBe('jj@email.com');
  });

  it('Should not be able to show a non-existing profile', async () => {
    await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    await expect(
      showProfile.execute({
        id: 'non-ecxisting-company_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
