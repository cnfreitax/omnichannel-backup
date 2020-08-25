import AppError from '@shared/errors/AppError';

import FakeChatbotRepository from '@modules/chatbot/repositories/fakes/FakeChatbotRepository';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import CreateEndOfChatbotMessageService from './CreateEndOfChatbotMessage.service';
import { MessageType } from '../infra/typeorm/entities/Message';

let fakeChatbotRepository: FakeChatbotRepository;
let fakeCompanyRepository: FakeCompanyRepository;
let createEndOfChatbot: CreateEndOfChatbotMessageService;

describe('CreateEndOfChatbotMessage', () => {
  beforeEach(() => {
    fakeChatbotRepository = new FakeChatbotRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    createEndOfChatbot = new CreateEndOfChatbotMessageService(fakeChatbotRepository, fakeCompanyRepository);
  });

  it('should be able to create a end of chatbot message', async () => {
    const company = await fakeCompanyRepository.create({
      email: 'jd@test.com',
      name: 'John Doe',
      password: '123123',
    });

    const parentMessage = await fakeChatbotRepository.create({
      company_id: String(company.id),
      text: 'Precisa de mais alguma coisa?',
      type: MessageType.SUBMENU,
    });

    const message = await createEndOfChatbot.execute({
      company_id: String(company.id),
      parent_id: String(parentMessage.id),
      text: 'Obrigado pelo seu contato',
      type: MessageType.END_CHATBOT,
    });

    expect(message).toHaveProperty('id');
    expect(message.type).toEqual(MessageType.END_CHATBOT);
  });

  it('should not be able to create a costumer survey with wrong message type', async () => {
    const company = await fakeCompanyRepository.create({
      email: 'jd@test.com',
      name: 'John Doe',
      password: '123123',
    });

    await expect(
      createEndOfChatbot.execute({
        company_id: String(company.id),
        text: 'Obrigado pelo seu contato',
        type: MessageType.GREETING,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a end of chatbot message with a non existing parent-id', async () => {
    const company = await fakeCompanyRepository.create({
      email: 'jd@test.com',
      name: 'John Doe',
      password: '123123',
    });

    await expect(
      createEndOfChatbot.execute({
        company_id: String(company.id),
        parent_id: 'non-existing-parent-id',
        text: 'Obrigado pelo seu contato',
        type: MessageType.END_CHATBOT,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a end of chatbot message with a non existing company-id', async () => {
    await expect(
      createEndOfChatbot.execute({
        company_id: 'non-existing-company-id',
        text: 'Obrigado pelo seu contato',
        type: MessageType.END_CHATBOT,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
