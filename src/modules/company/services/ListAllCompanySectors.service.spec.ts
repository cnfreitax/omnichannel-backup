import AppError from '@shared/errors/AppError';
import FakeSectorRepository from '@modules/company/repositories/fakes/FakeSectorRepository';
import ListAllCompanySectorsService from './ListAllCompanySectorsService';
import FakeCompanyRepository from '../repositories/fakes/FakeCompanyRepository';

let fakeCompanyRepository: FakeCompanyRepository;
let fakeSectorRepository: FakeSectorRepository;
let listAllCompanySectorsService: ListAllCompanySectorsService;

describe('ListAllCompanies', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    fakeSectorRepository = new FakeSectorRepository();
    listAllCompanySectorsService = new ListAllCompanySectorsService(fakeCompanyRepository, fakeSectorRepository);
  });

  it('should be able to list all company sectors', async () => {
    const company = await fakeCompanyRepository.create({
      name: 'Empresa 1',
      cnpj: '123456789',
    });

    await fakeSectorRepository.create({
      company_id: company.id,
      label: 'Vendas',
      phone: '999000999',
    });

    const allSectors = await listAllCompanySectorsService.execute(company.id);

    expect(allSectors).toHaveLength(1);
  });

  it('should not be able to list sectors for a non existing company', async () => {
    await expect(listAllCompanySectorsService.execute(999)).rejects.toBeInstanceOf(AppError);
  });
});
