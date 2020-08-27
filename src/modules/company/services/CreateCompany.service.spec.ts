import AppError from '@shared/errors/AppError';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import CreateCompanyService from './CreateCompany.service';

let fakeCompanyRepository: FakeCompanyRepository;
let createCompanyService: CreateCompanyService;

describe('CreateCompany', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    createCompanyService = new CreateCompanyService(fakeCompanyRepository);
  });

  it('should be able to create a new company', async () => {
    const company = await createCompanyService.execute({
      name: 'Empresa 1',
      cnpj: '1234567890',
    });

    expect(company).toHaveProperty('id');
  });

  it('should not be able to create a new company with an already registered cnpj', async () => {
    await createCompanyService.execute({
      name: 'Empresa 1',
      cnpj: '1234567890',
    });

    await expect(
      createCompanyService.execute({
        name: 'Empresa 2',
        cnpj: '1234567890',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
