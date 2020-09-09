import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import ListAllCompaniesService from './ListAllCompaniesService';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';

let fakeCompanyRepository: FakeCompanyRepository;
let listAllCompaniesService: ListAllCompaniesService;

const makeFakeRequestCompany = (): ICreateCompanyDTO => ({
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

describe('ListAllCompanies', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    listAllCompaniesService = new ListAllCompaniesService(fakeCompanyRepository);
  });

  it('should be able to list all companies', async () => {
    await fakeCompanyRepository.create(makeFakeRequestCompany());
    const allCompanies = await listAllCompaniesService.execute();
    expect(allCompanies).toHaveLength(1);
  });
});
