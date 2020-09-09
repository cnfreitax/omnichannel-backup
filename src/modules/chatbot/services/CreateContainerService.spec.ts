import AppError from '@shared/errors/AppError';
import FakeContainerRepository from '@modules/chatbot/repositories/fakes/FakeContainerRepository';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';
import CreateContainerService from './CreateContainerService';
import { ContainerType } from '../infra/typeorm/entities/Container';
import ISaveContainerDTO from '../dtos/ISaveContainerDTO';

let fakeContainerRepository: FakeContainerRepository;
let fakeCompanyRepository: FakeCompanyRepository;
let createContainerService: CreateContainerService;

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

describe('CreateContainerService', () => {
  beforeEach(() => {
    fakeContainerRepository = new FakeContainerRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    createContainerService = new CreateContainerService(fakeContainerRepository, fakeCompanyRepository);
  });

  it('should be able to create a new container', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());
    const container = await createContainerService.execute(makeFakeRequestContainer(company.id));

    expect(container).toHaveProperty('id');
    expect(container.type).toEqual(ContainerType.MENU);
  });

  it('should not be able to create a new container for a non existing company', async () => {
    await expect(
      createContainerService.execute({
        company_id: 9,
        description: 'O que voce quer?',
        type: ContainerType.MENU,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new container with a parent container', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());

    const parentContainer = await createContainerService.execute({
      company_id: company.id,
      description: 'Mensagem Ola',
      type: ContainerType.MESSAGE,
    });

    const container = await createContainerService.execute({
      company_id: company.id,
      from: parentContainer.id,
      description: 'Acabou',
      type: ContainerType.END_SERVICE,
    });

    expect(container).toHaveProperty('id');
    expect(container.type).toEqual(ContainerType.END_SERVICE);
    expect(container.from).toEqual(parentContainer.id);
  });

  it('should not be able to create a new container with a non existing parent container', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());

    await expect(
      createContainerService.execute({
        company_id: company.id,
        from: 9,
        description: 'Acabou',
        type: ContainerType.END_SERVICE,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
