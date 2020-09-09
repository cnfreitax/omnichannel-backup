import AppError from '@shared/errors/AppError';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import FakeSectorRepository from '@modules/company/repositories/fakes/FakeSectorRepository';

import CreateSectorService from './CreateSectorService';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import ICreateSectorDTO from '../dtos/ICreateSectorDTO';

let fakeCompanyRepository: FakeCompanyRepository;
let fakeSectorRepository: FakeSectorRepository;
let createSectorService: CreateSectorService;

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

describe('CreateCompany', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    fakeSectorRepository = new FakeSectorRepository();
    createSectorService = new CreateSectorService(fakeCompanyRepository, fakeSectorRepository);
  });

  it('should be able to create a new sector', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequestCompany());
    const sector = await createSectorService.execute(makeFakeRequestSector(company.id));

    expect(sector).toHaveProperty('id');
  });

  it('should not be able to create a sector for a non existing company', async () => {
    await expect(
      createSectorService.execute({
        company_id: 9999,
        label: 'Vendas',
        phone: 'any_',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
