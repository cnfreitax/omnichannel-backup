import AppError from '@shared/errors/AppError';
import FakeCompanyRepository from '../repositories/fakes/FakeCompanyRepository';

import ShowProfileService from './ShowProfile.service';

let fakeCompanyRepository: FakeCompanyRepository;
let showProfile: ShowProfileService;

describe('updateProfile', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    showProfile = new ShowProfileService(fakeCompanyRepository);
  });

  it('shoud be able to show profile', async () => {
    const company = await fakeCompanyRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    const profile = await showProfile.execute({
      company_id: `${company.id}`,
    });

    expect(profile.name).toBe('Eduardo');
    expect(profile.email).toBe('jj@email.com');
  });

  it('shoud be not able to show a non-existing profile', async () => {
    await fakeCompanyRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    await expect(
      showProfile.execute({
        company_id: 'non-ecxisting-company_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
