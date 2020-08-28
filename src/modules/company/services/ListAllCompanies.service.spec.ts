import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import ListAllCompaniesService from './ListAllCompanies.service';

let fakeCompanyRepository: FakeCompanyRepository;
let listAllCompaniesService: ListAllCompaniesService;

describe('ListAllCompanies', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    listAllCompaniesService = new ListAllCompaniesService(fakeCompanyRepository);
  });

  it('should be able to list all companies', async () => {
    await fakeCompanyRepository.create({
      name: 'Empresa 1',
      cnpj: '123456789',
    });

    const allCompanies = await listAllCompaniesService.execute();

    expect(allCompanies).toHaveLength(1);
  });
});
