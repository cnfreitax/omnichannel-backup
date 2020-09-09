import AppError from '@shared/errors/AppError';
import FakeSectorRepository from '@modules/company/repositories/fakes/FakeSectorRepository';
import ListAllCompanySectorsService from './ListAllCompanySectorsService';
import FakeCompanyRepository from '../repositories/fakes/FakeCompanyRepository';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import ICreateSectorDTO from '../dtos/ICreateSectorDTO';

let fakeCompanyRepository: FakeCompanyRepository;
let fakeSectorRepository: FakeSectorRepository;
let listAllCompanySectorsService: ListAllCompanySectorsService;

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

describe('ListAllCompanies', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    fakeSectorRepository = new FakeSectorRepository();
    listAllCompanySectorsService = new ListAllCompanySectorsService(fakeCompanyRepository, fakeSectorRepository);
  });

  it('should be able to list all company sectors', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequestCompany());
    await fakeSectorRepository.create(makeFakeRequestSector(company.id));
    const allSectors = await listAllCompanySectorsService.execute(company.id);
    expect(allSectors).toHaveLength(1);
  });

  it('Should not be able to list sectors for a non existing company', async () => {
    await expect(listAllCompanySectorsService.execute(999)).rejects.toBeInstanceOf(AppError);
  });
});
