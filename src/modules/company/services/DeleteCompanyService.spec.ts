import AppError from '@shared/errors/AppError';
import FakeCompanyRepository from '../repositories/fakes/FakeCompanyRepository';
import CreateCompanyService from './CreateCompanyService';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import DeleteCompanyService from './DeleteCompanyService';

let fakeCompanyRepository: FakeCompanyRepository;
let createCompanyService: CreateCompanyService;
let deleteCompanyService: DeleteCompanyService;

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

describe('DeleteCompany Service', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    createCompanyService = new CreateCompanyService(fakeCompanyRepository);
    deleteCompanyService = new DeleteCompanyService(fakeCompanyRepository);
  });

  test('Should delete company is user have permission', async () => {
    const company = await createCompanyService.execute(makeFakeRequest());
    const companyDelete = await deleteCompanyService.execute(company.id);
    expect(companyDelete).toBeTruthy();
  });

  test('Should returns throws if company not exists', async () => {
    expect(deleteCompanyService.execute(1)).rejects.toBeInstanceOf(AppError);
  });
});
