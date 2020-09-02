import AppError from '@shared/errors/AppError';

import FakeContainerRepository from '@modules/chatbot/repositories/fakes/FakeContainerRepository';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import CreateContainerService from './CreateContainerService';
import { ContainerType } from '../infra/typeorm/entities/Container';

let fakeContainerRepository: FakeContainerRepository;
let fakeCompanyRepository: FakeCompanyRepository;
let createContainerService: CreateContainerService;

describe('CreateContainerService', () => {
  beforeEach(() => {
    fakeContainerRepository = new FakeContainerRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    createContainerService = new CreateContainerService(fakeContainerRepository, fakeCompanyRepository);
  });

  it('should be able to create a new container', async () => {
    const company = await fakeCompanyRepository.create({
      name: 'Company Doe',
      cnpj: '123123',
    });

    const container = await createContainerService.execute({
      company_id: company.id,
      description: 'O que voce quer?',
      type: ContainerType.MENU,
    });

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
    const company = await fakeCompanyRepository.create({
      name: 'Company Doe',
      cnpj: '123123',
    });

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
    const company = await fakeCompanyRepository.create({
      name: 'Company Doe',
      cnpj: '123123',
    });

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
