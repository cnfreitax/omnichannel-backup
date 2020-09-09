import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';
import FakeCompanyRepository from '../repositories/fakes/FakeCompanyRepository';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import CreateCompanyService from './CreateCompanyService';

let fakeCompanyRepository: FakeCompanyRepository;
let showProfileService: ShowProfileService;
let createCompanyService: CreateCompanyService;

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

describe('ShowProfile Service', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    showProfileService = new ShowProfileService(fakeCompanyRepository);
    createCompanyService = new CreateCompanyService(fakeCompanyRepository);
  });
  test('Should be return an company profile if correct value is provided', async () => {
    const company = await createCompanyService.execute(makeFakeRequest());
    const showSpy = jest.spyOn(showProfileService, 'execute');
    showProfileService.execute(company.id);
    expect(showSpy).toHaveBeenLastCalledWith(company.id);
  });

  it('Should not be able show profile if invalid id is provided', async () => {
    await expect(showProfileService.execute(999)).rejects.toBeInstanceOf(AppError);
  });
});
