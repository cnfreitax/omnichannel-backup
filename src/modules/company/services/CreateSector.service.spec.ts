import AppError from '@shared/errors/AppError';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import FakeSectorRepository from '@modules/company/repositories/fakes/FakeSectorRepository';

import CreateSectorService from './CreateSectorService';

let fakeCompanyRepository: FakeCompanyRepository;
let fakeSectorRepository: FakeSectorRepository;
let createSectorService: CreateSectorService;

describe('CreateCompany', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    fakeSectorRepository = new FakeSectorRepository();
    createSectorService = new CreateSectorService(fakeCompanyRepository, fakeSectorRepository);
  });

  it('should be able to create a new sector', async () => {
    const company = await fakeCompanyRepository.create({
      name: 'Empresa 1',
      cnpj: '1234567890',
    });

    const sector = await createSectorService.execute({
      company_id: company.id,
      label: 'Vendas',
      phone: '999000999',
    });

    expect(sector).toHaveProperty('id');
  });

  it('should not be able to create a sector for a non existing company', async () => {
    await expect(
      createSectorService.execute({
        company_id: 9999,
        label: 'Vendas',
        phone: '999000999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
