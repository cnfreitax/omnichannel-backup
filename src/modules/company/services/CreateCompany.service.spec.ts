import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/company/providers/HashProvider/fakes/FakeHashProvider';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';

import CreateCompanyService from './CreateCompany.service';

describe('CreateCompany', () => {
  it('shoud br able to create a new Company', async () => {
    const fakeCompanyRepository = new FakeCompanyRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createCompanyService = new CreateCompanyService(fakeCompanyRepository, fakeHashProvider);

    const company = await createCompanyService.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    expect(company).toHaveProperty('id');
  });

  it('shoud not be able to create two Company with the same email', async () => {
    const fakeCompanyRepository = new FakeCompanyRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createCompanyService = new CreateCompanyService(fakeCompanyRepository, fakeHashProvider);

    await createCompanyService.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    expect(
      createCompanyService.execute({
        email: 'jj@email.com',
        name: 'Eduardo',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
