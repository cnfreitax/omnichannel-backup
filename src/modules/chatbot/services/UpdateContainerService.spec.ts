import AppError from '@shared/errors/AppError';

import FakeContainerRepository from '@modules/chatbot/repositories/fakes/FakeContainerRepository';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';
import UpdateContainerService from './UpdateContainerService';
import { ContainerType } from '../infra/typeorm/entities/Container';

let fakeContainerRepository: FakeContainerRepository;
let fakeCompanyRepository: FakeCompanyRepository;
let updateContainerService: UpdateContainerService;

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

describe('CreateContainerService', () => {
  beforeEach(() => {
    fakeContainerRepository = new FakeContainerRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    updateContainerService = new UpdateContainerService(fakeContainerRepository);
  });

  it('should be able to update a existing container', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());

    const fromContainer = await fakeContainerRepository.create({
      company_id: company.id,
      description: 'Ola',
      type: ContainerType.GREETING,
    });

    const container = await fakeContainerRepository.create({
      company_id: company.id,
      description: 'O que voce quer?',
      type: ContainerType.MENU,
    });

    const toContainer = await fakeContainerRepository.create({
      company_id: company.id,
      description: 'Obrigado',
      type: ContainerType.END_CHATBOT,
    });

    const updatedContainer = await updateContainerService.execute({
      id: container.id,
      description: 'Ola como vai?',
      from: fromContainer.id,
      to: toContainer.id,
    });

    expect(updatedContainer).toHaveProperty('id');
    expect(updatedContainer.description).toEqual('Ola como vai?');
    expect(updatedContainer.type).toEqual(ContainerType.MENU);
  });

  it('should not be able to update a non existing container', async () => {
    await expect(
      updateContainerService.execute({
        id: 9,
        description: 'O que voce quer?',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a existing container with a non existing toContainer', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());

    const container = await fakeContainerRepository.create({
      company_id: company.id,
      description: 'O que voce quer?',
      type: ContainerType.MENU,
    });

    await expect(
      updateContainerService.execute({
        id: container.id,
        description: 'Ola como vai?',
        to: 9,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a existing container with a non existing fromContainer', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());

    const container = await fakeContainerRepository.create({
      company_id: company.id,
      description: 'O que voce quer?',
      type: ContainerType.MENU,
    });

    await expect(
      updateContainerService.execute({
        id: container.id,
        description: 'Ola como vai?',
        from: 9,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a existing container with content', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());

    const container = await fakeContainerRepository.create({
      company_id: company.id,
      description: 'O que voce quer?',
      type: ContainerType.API,
    });

    const updatedContainer = await updateContainerService.execute({
      id: container.id,
      description: 'Ola como vai?',
      content: { link: 'teste' },
    });

    expect(updatedContainer).toHaveProperty('id');
    expect(updatedContainer.content).toHaveProperty('link');
    expect(updatedContainer.type).toEqual(ContainerType.API);
  });

  it('should be able to update a existing container with content 2', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());

    const container = await fakeContainerRepository.create({
      company_id: company.id,
      description: 'O que voce quer?',
      type: ContainerType.MEDIA,
    });

    const updatedContainer = await updateContainerService.execute({
      id: container.id,
      description: 'Ola como vai?',
      content: {
        media: {
          idMedia: '123',
          nomeArquivo: 'aaa',
          validUntil: '2132',
        },
      },
    });

    expect(updatedContainer).toHaveProperty('id');
    expect(updatedContainer.content).toHaveProperty('media');
    expect(updatedContainer.type).toEqual(ContainerType.MEDIA);
  });

  it('should not be able to update a existing container with invalid content type', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());

    const container = await fakeContainerRepository.create({
      company_id: company.id,
      description: 'O que voce quer?',
      type: ContainerType.API,
    });

    await expect(
      updateContainerService.execute({
        id: container.id,
        description: 'Ola como vai?',
        content: {
          media: {
            idMedia: '123',
            nomeArquivo: 'aaa',
            validUntil: '2132',
          },
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a existing container with invalid content type 2', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());

    const container = await fakeContainerRepository.create({
      company_id: company.id,
      description: 'O que voce quer?',
      type: ContainerType.MEDIA,
    });

    await expect(
      updateContainerService.execute({
        id: container.id,
        description: 'Ola como vai?',
        content: { link: 'teste' },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
