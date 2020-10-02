import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Chatline from '../infra/typeorm/entities/Chatline';
import IChatlineRepository from '../repository/IChatlineRepository';

@injectable()
export default class ListAllChatFromCompany {
  constructor(
    @inject('ChatlineRepository')
    private chatlineRepository: IChatlineRepository,

    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(company_id: number): Promise<Chatline[]> {
    const company = await this.companyRepository.findById(company_id);
    if (!company) {
      throw new AppError('Company not found. Try again.');
    }

    const chats = await this.chatlineRepository.listAll(company.id);
    return chats;
  }
}
