import AppError from '@shared/errors/AppError';

import FakeContainerRepository from '@modules/chatbot/repositories/fakes/FakeContainerRepository';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';
import CreateCostumerSurveyService from './CreateCostumerSurveyService';
import { ContainerType } from '../infra/typeorm/entities/Container';

let fakeContainerRepository: FakeContainerRepository;
let fakeCompanyRepository: FakeCompanyRepository;
let createCostumerSurvey: CreateCostumerSurveyService;

describe('CreateCostumerSurvey', () => {
  beforeEach(() => {
    fakeContainerRepository = new FakeContainerRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    createCostumerSurvey = new CreateCostumerSurveyService(fakeContainerRepository, fakeCompanyRepository);
  });

  it('should be able to create a costumer survey', async () => {
    const company = await fakeCompanyRepository.create({
      name: 'Company Doe',
      cnpj: '123123',
    });

    const parentMessage = await fakeContainerRepository.create({
      company_id: company.id,
      description: 'Precisa de mais alguma coisa?',
      type: ContainerType.MESSAGE,
    });

    const message = await createCostumerSurvey.execute({
      company_id: company.id,
      from: parentMessage.id,
      description: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
      type: ContainerType.SURVEY,
    });

    expect(message).toHaveProperty('id');
    expect(message.type).toEqual(ContainerType.SURVEY);
  });

  it('should not be able to create a costumer survey with wrong message type', async () => {
    const company = await fakeCompanyRepository.create({
      name: 'Company Doe',
      cnpj: '123123',
    });

    await expect(
      createCostumerSurvey.execute({
        company_id: company.id,
        description: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
        type: ContainerType.GREETING,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a costumer survey with a non existing parent-id', async () => {
    const company = await fakeCompanyRepository.create({
      name: 'Company Doe',
      cnpj: '123123',
    });

    await expect(
      createCostumerSurvey.execute({
        company_id: company.id,
        from: 9,
        description: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
        type: ContainerType.SURVEY,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a costumer survey with a non existing company-id', async () => {
    await expect(
      createCostumerSurvey.execute({
        company_id: 9,
        description: 'De 0 a 10 quão satisfeito você está com nossos serviços?',
        type: ContainerType.SURVEY,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
