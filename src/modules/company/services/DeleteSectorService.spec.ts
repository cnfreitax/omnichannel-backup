import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import FakeSectorRepository from '@modules/company/repositories/fakes/FakeSectorRepository';
import CreateSectorService from './CreateSectorService';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import ICreateSectorDTO from '../dtos/ICreateSectorDTO';
import DeleteSectorService from './DeleteSectorService';

let fakeCompanyRepository: FakeCompanyRepository;
let fakeSectorRepository: FakeSectorRepository;
let createSectorService: CreateSectorService;
let deleteSectorService: DeleteSectorService;

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

const makeFakeRequestSector = (companyId: number): ICreateSectorDTO => ({
  company_id: companyId,
  label: 'any_name',
  phone: 'any_phone',
});

describe('DeleteSector Service', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    fakeSectorRepository = new FakeSectorRepository();
    createSectorService = new CreateSectorService(fakeCompanyRepository, fakeSectorRepository);
    deleteSectorService = new DeleteSectorService(fakeSectorRepository);
  });

  test('Should be able to delete an sector', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequestCompany());
    const sector = await createSectorService.execute(makeFakeRequestSector(company.id));
    const deleteSpy = jest.spyOn(deleteSectorService, 'execute');
    await deleteSectorService.execute(sector.id);
    expect(deleteSpy).toHaveBeenCalledWith(sector.id);
  });
});
