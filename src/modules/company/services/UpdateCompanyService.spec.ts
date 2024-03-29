import AppError from '@shared/errors/AppError';
import CreateCompanyService from './CreateCompanyService';
import UpdateCompanyService from './UpdateCompanyService';
import FakeCompanyRepository from '../repositories/fakes/FakeCompanyRepository';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';

let fakeCompanyRepository: FakeCompanyRepository;
let createCompanyService: CreateCompanyService;
let updateCompanyService: UpdateCompanyService;

const makeFakeRequest = (): ICreateCompanyDTO => ({
  name: 'Empresa 1',
  email: 'any_email',
  cnpj: '1234567890',
  address: 'any_address',
  activity: 'any_activity',
  ddd: 'any_ddd',
  website: 'any_web',
  webhook_response: 'any_hook',
  webhook_status: 'any_hook',
});

describe('UpdateCompany Service', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    createCompanyService = new CreateCompanyService(fakeCompanyRepository);
    updateCompanyService = new UpdateCompanyService(fakeCompanyRepository);
  });
  test('Should update company profile if all correct values if provided', async () => {
    const company = await createCompanyService.execute(makeFakeRequest());
    await updateCompanyService.execute({
      id: company.id,
      name: 'New Name',
      email: 'new@mail.com',
      address: 'any_address',
      activity: 'new_activity',
      ddd: 'new_ddd',
      website: 'new_web',
    });
    expect(company.email).toEqual('new@mail.com');
  });

  test('Should returns throws if company not found', async () => {
    await expect(
      updateCompanyService.execute({
        id: 0,
        name: 'New Name',
        email: 'another@mail.com',
        address: 'any_address',
        activity: 'new_activity',
        ddd: 'new_ddd',
        website: 'new_web',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  test('Should return throws if email updated alredy in used', async () => {
    await createCompanyService.execute({
      name: 'Empresa 2',
      email: 'another@mail.com',
      cnpj: '123467890',
      address: 'any_address',
      activity: 'any_activity',
      ddd: 'any_ddd',
      website: 'any_web',
      webhook_response: 'any_hook',
      webhook_status: 'any_hook',
    });
    const company = await createCompanyService.execute(makeFakeRequest());
    await expect(
      updateCompanyService.execute({
        id: company.id,
        name: 'New Name',
        email: 'another@mail.com',
        address: 'any_address',
        activity: 'new_activity',
        ddd: 'new_ddd',
        website: 'new_web',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
