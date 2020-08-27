import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';

import CreateCompanyService from './CreateCompany.service';

let fakeCompanyRepository: FakeCompanyRepository;
let createCompanyService: CreateCompanyService;

describe('CreateCompany', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    createCompanyService = new CreateCompanyService(fakeCompanyRepository);
  });
  it('shoud br able to create a new Company', async () => {
    const company = await createCompanyService.execute({
      name: 'Empresa 1',
    });

    expect(company).toHaveProperty('id');
  });
});
