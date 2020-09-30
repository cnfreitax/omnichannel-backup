import ISaveSurveyDTO from '@modules/chatbot/dtos/ISaveSurveyDTO';
import SurveyAnswer from '@modules/chatbot/infra/typeorm/entities/SurveyAnswer';

export default interface ISurveyAnswerRepository {
  listAllAnswers(company_id: number): Promise<SurveyAnswer[]>;
  create(data: ISaveSurveyDTO): Promise<SurveyAnswer>;
  save(container: SurveyAnswer): Promise<SurveyAnswer>;
}
