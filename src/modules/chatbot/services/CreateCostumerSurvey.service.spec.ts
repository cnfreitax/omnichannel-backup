import AppError from '@shared/errors/AppError';

import FakeChatbotRepository from '@modules/chatbot/repositories/fakes/FakeChatbotRepository';
import CreateCostumerSurveyService from './CreateCostumerSurvey.service';
import { MessageType } from '../infra/typeorm/entities/Message';

let fakeChatbotRepository: FakeChatbotRepository;
let createCostumerSurvey: CreateCostumerSurveyService;

describe('CreateCostumerSurvey', () => {
  beforeEach(() => {
    fakeChatbotRepository = new FakeChatbotRepository();
    createCostumerSurvey = new CreateCostumerSurveyService(fakeChatbotRepository);
  });

  it('should be able to create a costumer survey', async () => {
    const message = await createCostumerSurvey.execute({
      company_id: 1,
      text: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
      type: MessageType.SURVEY,
    });

    expect(message).toHaveProperty('id');
    expect(message.type).toEqual(MessageType.SURVEY);
  });

  it('should not be able to create a costumer survey with a non existing parent-id', async () => {
    await expect(
      createCostumerSurvey.execute({
        company_id: 1,
        parent_id: 1,
        text: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
        type: MessageType.SURVEY,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a costumer survey with a non existing company-id', async () => {
    await expect(
      createCostumerSurvey.execute({
        company_id: 1,
        text: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
        type: MessageType.SURVEY,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
