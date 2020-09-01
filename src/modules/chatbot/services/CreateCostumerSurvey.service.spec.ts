import AppError from '@shared/errors/AppError';

import FakeChatbotRepository from '@modules/chatbot/repositories/fakes/FakeChatbotRepository';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import CreateCostumerSurveyService from './CreateCostumerSurvey.service';
import { MessageType } from '../infra/typeorm/entities/Message';

let fakeChatbotRepository: FakeChatbotRepository;
let fakeCompanyRepository: FakeCompanyRepository;
let createCostumerSurvey: CreateCostumerSurveyService;

describe('CreateCostumerSurvey', () => {
  beforeEach(() => {
    fakeChatbotRepository = new FakeChatbotRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    createCostumerSurvey = new CreateCostumerSurveyService(fakeChatbotRepository, fakeCompanyRepository);
  });

  it('should be able to create a costumer survey', async () => {
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

    const message = await createCostumerSurvey.execute({
      company_id: String(company.id),
      parent_id: String(parentMessage.id),
      text: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
      type: MessageType.SURVEY,
    });

    expect(message).toHaveProperty('id');
    expect(message.type).toEqual(MessageType.SURVEY);
  });

  it('should not be able to create a costumer survey with wrong message type', async () => {
    const company = await fakeCompanyRepository.create({
      email: 'jd@test.com',
      name: 'John Doe',
      password: '123123',
    });

    await expect(
      createCostumerSurvey.execute({
        company_id: String(company.id),
        text: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
        type: MessageType.GREETING,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a costumer survey with a non existing parent-id', async () => {
    const company = await fakeCompanyRepository.create({
      email: 'jd@test.com',
      name: 'John Doe',
      password: '123123',
    });

    await expect(
      createCostumerSurvey.execute({
        company_id: String(company.id),
        parent_id: 'non-existing-parent-id',
        text: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
        type: MessageType.SURVEY,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a costumer survey with a non existing company-id', async () => {
    await expect(
      createCostumerSurvey.execute({
        company_id: 'non-existing-company-id',
        text: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
        type: MessageType.SURVEY,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
