import AppError from '@shared/errors/AppError';

import FakeChatbotRepository from '@modules/chatbot/repositories/fakes/FakeChatbotRepository';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';

import CreateGreetingMessageService from '@modules/chatbot/services/CreateGreetingMessage.service';

import { MessageType } from '@modules/chatbot/infra/typeorm/entities/Message';

let fakeChatbotRepository: FakeChatbotRepository;
let fakeCompanyRepository: FakeCompanyRepository;
let createGreetingMessage: CreateGreetingMessageService;

describe('CreateGreetings', () => {
  beforeEach(() => {
    fakeChatbotRepository = new FakeChatbotRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    createGreetingMessage = new CreateGreetingMessageService(fakeChatbotRepository, fakeCompanyRepository);
  });

  it('shoud br able to create a greeting', async () => {
    const company = await fakeCompanyRepository.create({
      email: 'jd@test.com',
      name: 'John Doe',
      password: '123123',
    });

    const greetingMessage = await createGreetingMessage.execute({
      company_id: String(company.id),
      text: 'seja bem vindo!!',
      type: MessageType.GREETING,
    });

    expect(greetingMessage).toHaveProperty('id');
  });

  it('shoud not be able to create two greeting with a non existing company', async () => {
    expect(
      createGreetingMessage.execute({ company_id: 'non-existing-company', text: 'seja bem vindo!!', type: MessageType.GREETING }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to create two greeting with a non existing company', async () => {
    const company = await fakeCompanyRepository.create({
      email: 'jd@test.com',
      name: 'John Doe',
      password: '123123',
    });

    expect(
      createGreetingMessage.execute({ company_id: String(company.id), text: 'seja bem vindo!!', type: MessageType.SUBMENU }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
