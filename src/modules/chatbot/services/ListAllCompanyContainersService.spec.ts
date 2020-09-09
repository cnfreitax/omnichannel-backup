import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';
import AppError from '@shared/errors/AppError';
import FakeContainerRepository from '../repositories/fakes/FakeContainerRepository';
import CreateContainerService from './CreateContainerService';
import ISaveContainerDTO from '../dtos/ISaveContainerDTO';
import { ContainerType } from '../infra/typeorm/entities/Container';
import ListAllCompanyContainersService from './ListAllCompanyContainersService';

let fakeContainerRepository: FakeContainerRepository;
let fakeCompanyRepository: FakeCompanyRepository;
let createContainerService: CreateContainerService;
let listContainers: ListAllCompanyContainersService;

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

const makeFakeRequestContainer = (companyId: number): ISaveContainerDTO => ({
  company_id: companyId,
  description: 'any_description',
  type: ContainerType.MENU,
});

describe('ListAllCompanyContainers Service', () => {
  beforeEach(() => {
    fakeContainerRepository = new FakeContainerRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    listContainers = new ListAllCompanyContainersService(fakeContainerRepository, fakeCompanyRepository);
    createContainerService = new CreateContainerService(fakeContainerRepository, fakeCompanyRepository);
  });
  test('Should be able list a containers that belong to a company', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());
    const container = await createContainerService.execute(makeFakeRequestContainer(company.id));
    await createContainerService.execute(makeFakeRequestContainer(company.id));
    const containers = await listContainers.execute(container.company_id);
    expect(containers).toHaveLength(2);
  });

  test('Should not be able list containers if invalid company id is provided', async () => {
    await expect(listContainers.execute(0)).rejects.toBeInstanceOf(AppError);
  });
});
