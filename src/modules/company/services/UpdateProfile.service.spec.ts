import FakeHashProvider from '@modules/company/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeCompanyRepository from '../repositories/fakes/FakeCompanyRepository';

import UpdateProfileService from './UpdateProfile.service';

let fakeHashProvider: FakeHashProvider;
let fakeCompanyRepository: FakeCompanyRepository;
let updateProfile: UpdateProfileService;

describe('updateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeCompanyRepository = new FakeCompanyRepository();
    updateProfile = new UpdateProfileService(fakeCompanyRepository, fakeHashProvider);
  });

  it('shoud br able to update profiler', async () => {
    const company = await fakeCompanyRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    const updatedCompany = await updateProfile.execute({
      company_id: `${company.id}`,
      name: 'odraude',
      email: 'eduardo@gmail.com',
    });

    expect(updatedCompany.name).toBe('odraude');
    expect(updatedCompany.email).toBe('eduardo@gmail.com');
  });

  it('shoud be not able to update a non-existing profiler', async () => {
    await fakeCompanyRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        company_id: 'no-nexisting-id',
        name: 'odraude',
        email: 'eduardo@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud be not able to update email whit an existent email from other company ', async () => {
    await fakeCompanyRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    const company = await fakeCompanyRepository.create({
      email: 'edu@email.com',
      name: 'Eduardo2',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        company_id: `${company.id}`,
        email: 'jj@email.com',
        name: 'Eduardo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud be able to update password', async () => {
    const company = await fakeCompanyRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    const updatedCompany = await updateProfile.execute({
      company_id: `${company.id}`,
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123123',
      oldPassword: '123456',
    });

    expect(updatedCompany.password).toBe('123123');
  });

  it('shoud be not able to update password without an old password', async () => {
    const company = await fakeCompanyRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        company_id: `${company.id}`,
        email: 'jj@email.com',
        name: 'Eduardo',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud be not able to update password with wrong old password', async () => {
    const company = await fakeCompanyRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        company_id: `${company.id}`,
        email: 'jj@email.com',
        name: 'Eduardo',
        password: '123123',
        oldPassword: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
