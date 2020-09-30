import { getRepository, Repository } from 'typeorm';

import ISurveyAnswerRepository from '@modules/chatbot/repositories/ISurveyAnswerRepository';

import SurveyAnswer from '@modules/chatbot/infra/typeorm/entities/SurveyAnswer';
import ISaveSurveyDTO from '@modules/chatbot/dtos/ISaveSurveyDTO';

class SurveyAnswerRepository implements ISurveyAnswerRepository {
  private ormRepository: Repository<SurveyAnswer>;

  constructor() {
    this.ormRepository = getRepository(SurveyAnswer);
  }

  public async listAllAnswers(company_id: number): Promise<SurveyAnswer[]> {
    const surveyAnswers = await this.ormRepository.find({ where: { company_id } });

    return surveyAnswers;
  }

  public async create(data: ISaveSurveyDTO): Promise<SurveyAnswer> {
    const surveyAnswer = this.ormRepository.create(data);

    await this.ormRepository.save(surveyAnswer);

    return surveyAnswer;
  }

  public async save(surveyAnswer: SurveyAnswer): Promise<SurveyAnswer> {
    return this.ormRepository.save(surveyAnswer);
  }
}

export default SurveyAnswerRepository;
