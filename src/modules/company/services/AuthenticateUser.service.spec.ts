import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/company/providers/HashProvider/fakes/FakeHashProvider';
import FakeCompanyRepository from '../repositories/fakes/FakeCompanyRepository';
import CreateCompanyService from './CreateCompany.service';
import AuthenticateCompanyService from './AuthenticateCompany.service';

let fakeCompanyRepository: FakeCompanyRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateCompany: AuthenticateCompanyService;
let CreateCompany: CreateCompanyService;

describe('authCompany', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateCompany = new AuthenticateCompanyService(fakeCompanyRepository, fakeHashProvider);
    CreateCompany = new CreateCompanyService(fakeCompanyRepository, fakeHashProvider);
  });

  it('shoud br able to auth', async () => {
    await CreateCompany.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    const response = await authenticateCompany.execute({
      email: 'jj@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('shoud not be able to login with incorrect email', async () => {
    await CreateCompany.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    expect(
      authenticateCompany.execute({
        email: 'jjj@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to login with incorrect password', async () => {
    await CreateCompany.execute({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
    });

    expect(
      authenticateCompany.execute({
        email: 'jj@email.com',
        password: '1234564',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
