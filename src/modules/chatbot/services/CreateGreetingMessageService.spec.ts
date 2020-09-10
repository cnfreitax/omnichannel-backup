import AppError from '@shared/errors/AppError';
import FakeContainerRepository from '@modules/chatbot/repositories/fakes/FakeContainerRepository';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import CreateGreetingMessageService from '@modules/chatbot/services/CreateGreetingMessageService';
import { ContainerType } from '@modules/chatbot/infra/typeorm/entities/Container';
import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';

let fakeContainerRepository: FakeContainerRepository;
let fakeCompanyRepository: FakeCompanyRepository;
let createGreetingMessage: CreateGreetingMessageService;

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

describe('CreateGreetings', () => {
  beforeEach(() => {
    fakeContainerRepository = new FakeContainerRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    createGreetingMessage = new CreateGreetingMessageService(fakeContainerRepository, fakeCompanyRepository);
  });

  it('should be able to create a greeting', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());
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
    const company = await fakeCompanyRepository.create(makeFakeRequest());

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
    const company = await fakeCompanyRepository.create(makeFakeRequest());

    await expect(
      createGreetingMessage.execute({ company_id: company.id, description: 'seja bem vindo!!', type: ContainerType.MENU }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
