import AppError from '@shared/errors/AppError';
import FakeContainerRepository from '@modules/chatbot/repositories/fakes/FakeContainerRepository';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';
import CreateEndOfChatbotMessageService from './CreateEndOfChatbotMessageService';
import { ContainerType } from '../infra/typeorm/entities/Container';

let fakeContainerRepository: FakeContainerRepository;
let fakeCompanyRepository: FakeCompanyRepository;
let createEndOfChatbot: CreateEndOfChatbotMessageService;

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

describe('CreateEndOfChatbotMessage', () => {
  beforeEach(() => {
    fakeContainerRepository = new FakeContainerRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    createEndOfChatbot = new CreateEndOfChatbotMessageService(fakeContainerRepository, fakeCompanyRepository);
  });

  it('should be able to create a end of chatbot message', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());

    const message = await createEndOfChatbot.execute({
      company_id: company.id,
      description: 'Obrigado pelo seu contato',
      type: ContainerType.END_CHATBOT,
    });

    expect(message).toHaveProperty('id');
    expect(message.type).toEqual(ContainerType.END_CHATBOT);
  });

  it('should not be able to create a costumer survey with wrong message type', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());

    await expect(
      createEndOfChatbot.execute({
        company_id: company.id,
        description: 'Obrigado pelo seu contato',
        type: ContainerType.GREETING,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a end of chatbot message with a non existing company-id', async () => {
    await expect(
      createEndOfChatbot.execute({
        company_id: 9,
        description: 'Obrigado pelo seu contato',
        type: ContainerType.END_CHATBOT,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a end of chatbot message if company already has one', async () => {
    const company = await fakeCompanyRepository.create(makeFakeRequest());

    const parentMessage = await fakeContainerRepository.create({
      company_id: company.id,
      description: 'Precisa de mais alguma coisa?',
      type: ContainerType.MENU,
    });

    await createEndOfChatbot.execute({
      company_id: company.id,
      from: parentMessage.id,
      description: 'Obrigado pelo seu contato',
      type: ContainerType.END_CHATBOT,
    });

    await expect(
      createEndOfChatbot.execute({
        company_id: company.id,
        from: parentMessage.id,
        description: 'Obrigado pelo seu contato',
        type: ContainerType.END_CHATBOT,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
