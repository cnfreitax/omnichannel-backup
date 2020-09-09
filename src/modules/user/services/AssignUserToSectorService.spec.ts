import FakeSectorRepository from '@modules/company/repositories/fakes/FakeSectorRepository';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import CreateSectorService from '@modules/company/services/CreateSectorService';
import AppError from '@shared/errors/AppError';
import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AssignUserToSectorService from './AssignUserToSectorService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ICreateUsertDTO from '../dtos/ICreateUserDTO';

let fakeUserRepository: FakeUserRepository;
let fakeSectorRepository: FakeSectorRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCompanyRepository: FakeCompanyRepository;
let createSectorService: CreateSectorService;
let assignSector: AssignUserToSectorService;
let createUser: CreateUserService;

const makeFakeCompany = (): ICreateCompanyDTO => ({
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

const makeFakeUser = (): ICreateUsertDTO => ({
  name: 'any_name',
  email: 'any@mail.com',
  password: 'any_password',
  access_level: 'adm',
});

describe('AssignUserToSectorService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeSectorRepository = new FakeSectorRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeSectorRepository = new FakeSectorRepository();
    createSectorService = new CreateSectorService(fakeCompanyRepository, fakeSectorRepository);
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    assignSector = new AssignUserToSectorService(fakeUserRepository, fakeSectorRepository);
  });
  test('Should assign a sector to a user', async () => {
    const user = await createUser.execute(makeFakeUser());
    const company = await fakeCompanyRepository.create(makeFakeCompany());

    const sector = await createSectorService.execute({
      company_id: company.id,
      label: 'any_name',
      phone: 'any_phone',
    });

    await assignSector.execute({
      sector_id: sector.id,
      user_id: user.id,
    });

    expect(user.sector_id).toEqual(sector.id);
  });

  test('Should return throws if sector does not exists', async () => {
    const user = await createUser.execute(makeFakeUser());

    await expect(
      assignSector.execute({
        sector_id: 0,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  test('Should return throws if user does not exists', async () => {
    const company = await fakeCompanyRepository.create(makeFakeCompany());

    const sector = await createSectorService.execute({
      company_id: company.id,
      label: 'any_name',
      phone: 'any_phone',
    });

    await expect(
      assignSector.execute({
        sector_id: sector.id,
        user_id: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
