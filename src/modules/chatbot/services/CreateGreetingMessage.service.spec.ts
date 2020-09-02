import AppError from '@shared/errors/AppError';

import FakeContainerRepository from '@modules/chatbot/repositories/fakes/FakeContainerRepository';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';

import CreateGreetingMessageService from '@modules/chatbot/services/CreateGreetingMessageService';

import { ContainerType } from '@modules/chatbot/infra/typeorm/entities/Container';

let fakeContainerRepository: FakeContainerRepository;
let fakeCompanyRepository: FakeCompanyRepository;
let createGreetingMessage: CreateGreetingMessageService;

describe('CreateGreetings', () => {
  beforeEach(() => {
    fakeContainerRepository = new FakeContainerRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    createGreetingMessage = new CreateGreetingMessageService(fakeContainerRepository, fakeCompanyRepository);
  });

  it('should be able to create a greeting', async () => {
    const company = await fakeCompanyRepository.create({
      name: 'Company Doe',
      cnpj: '123123',
    });

    const greetingMessage = await createGreetingMessage.execute({
      company_id: company.id,
      description: 'seja bem vindo!!',
      type: ContainerType.GREETING,
    });

    expect(greetingMessage).toHaveProperty('id');
  });

  it('should not be able to create greeting with a non existing company', async () => {
    await expect(
      createGreetingMessage.execute({ company_id: 9, description: 'seja bem vindo!!', type: ContainerType.GREETING }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two greetings with same company', async () => {
    const company = await fakeCompanyRepository.create({
      name: 'Company Doe',
      cnpj: '123123',
    });

    await createGreetingMessage.execute({
      company_id: company.id,
      description: 'seja bem vindo!!',
      type: ContainerType.GREETING,
    });

    await expect(
      createGreetingMessage.execute({ company_id: company.id, description: 'seja bem vindo!!', type: ContainerType.GREETING }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to create a greeting with a different type', async () => {
    const company = await fakeCompanyRepository.create({
      name: 'Company Doe',
      cnpj: '123123',
    });

    await expect(
      createGreetingMessage.execute({ company_id: company.id, description: 'seja bem vindo!!', type: ContainerType.MENU }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
