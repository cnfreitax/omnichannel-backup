import 'reflect-metadata';
import CreateCompanyService from '@modules/company/services/CreateCompanyService';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';
import AppError from '@shared/errors/AppError';
import CreateOptionService from './CreateOptionService';
import FakeOptionRepository from '../repositories/fakes/FakeOptionRepository';
import FakeContainerRepository from '../repositories/fakes/FakeContainerRepository';
import CreateContainerService from './CreateContainerService';
import ISaveContainerDTO from '../dtos/ISaveContainerDTO';
import { ContainerType } from '../infra/typeorm/entities/Container';

let fakeOptionRepository: FakeOptionRepository;
let fakeContainerRepository: FakeContainerRepository;
let fakeCompanyRepository: FakeCompanyRepository;
let createCompany: CreateCompanyService;
let createContainer: CreateContainerService;
let createOption: CreateOptionService;

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

const makeOptionRequest = (containerId: number) => ({
  container_id: containerId,
  description: 'any_description',
});

describe('CreateOption Service', () => {
  beforeEach(() => {
    fakeOptionRepository = new FakeOptionRepository();
    fakeContainerRepository = new FakeContainerRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    createCompany = new CreateCompanyService(fakeCompanyRepository);
    createContainer = new CreateContainerService(fakeContainerRepository, fakeCompanyRepository);
    createOption = new CreateOptionService(fakeOptionRepository, fakeContainerRepository);
  });
  test('Should be able create a Option if correct values is provided', async () => {
    const company = await createCompany.execute(makeFakeRequest());
    const container = await createContainer.execute(makeFakeRequestContainer(company.id));
    const option = await createOption.execute(makeOptionRequest(container.id));
    expect(option).toHaveProperty('id');
  });

  test('Should not be able create a Option if invalid container_id is provider', async () => {
    await expect(
      createOption.execute({
        container_id: 0,
        description: 'any_description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
