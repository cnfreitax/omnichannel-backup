import AppError from '@shared/errors/AppError';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import CreateCompanyService from './CreateCompanyService';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';

let fakeCompanyRepository: FakeCompanyRepository;
let createCompanyService: CreateCompanyService;

const makeFakeRequest = (): ICreateCompanyDTO => ({
  name: 'Empresa 1',
  email: 'any_email',
  cnpj: '1234567890',
  address: 'any_address',
  codCampaign: '1234',
  activity: 'any_activity',
  ddd: 'any_ddd',
  website: 'any_web',
  webhook_response: 'any_hook',
  webhook_status: 'any_hook',
});

describe('CreateCompany Service', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    createCompanyService = new CreateCompanyService(fakeCompanyRepository);
  });

  test('Should be able to create a new company', async () => {
    const company = await createCompanyService.execute(makeFakeRequest());
    expect(company).toHaveProperty('id');
  });

  test('should not be able to create a new company with an already registered cnpj', async () => {
    await createCompanyService.execute(makeFakeRequest());
    expect(createCompanyService.execute(makeFakeRequest())).rejects.toBeInstanceOf(AppError);
  });

  test('Should not create Company if email provided alredy in used', async () => {
    await createCompanyService.execute(makeFakeRequest());

    await expect(
      createCompanyService.execute({
        name: 'Empresa 1',
        email: 'any_email',
        cnpj: 'other_cnpj',
        address: 'any_address',
        activity: 'any_activity',
        ddd: 'any_ddd',
        website: 'any_web',
        webhook_response: 'any_hook',
        webhook_status: 'any_hook',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
