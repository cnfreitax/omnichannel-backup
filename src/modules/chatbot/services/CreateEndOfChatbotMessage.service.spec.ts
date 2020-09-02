import AppError from '@shared/errors/AppError';

import FakeContainerRepository from '@modules/chatbot/repositories/fakes/FakeContainerRepository';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import CreateEndOfChatbotMessageService from './CreateEndOfChatbotMessageService';
import { ContainerType } from '../infra/typeorm/entities/Container';

let fakeContainerRepository: FakeContainerRepository;
let fakeCompanyRepository: FakeCompanyRepository;
let createEndOfChatbot: CreateEndOfChatbotMessageService;

describe('CreateEndOfChatbotMessage', () => {
  beforeEach(() => {
    fakeContainerRepository = new FakeContainerRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    createEndOfChatbot = new CreateEndOfChatbotMessageService(fakeContainerRepository, fakeCompanyRepository);
  });

  it('should be able to create a end of chatbot message', async () => {
    const company = await fakeCompanyRepository.create({
      name: 'Company Doe',
      cnpj: '123123',
    });

    const message = await createEndOfChatbot.execute({
      company_id: company.id,
      description: 'Obrigado pelo seu contato',
      type: ContainerType.END_CHATBOT,
    });

    expect(message).toHaveProperty('id');
    expect(message.type).toEqual(ContainerType.END_CHATBOT);
  });

  it('should not be able to create a costumer survey with wrong message type', async () => {
    const company = await fakeCompanyRepository.create({
      name: 'Company Doe',
      cnpj: '123123',
    });

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
    const company = await fakeCompanyRepository.create({
      name: 'Company Doe',
      cnpj: '123123',
    });

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
