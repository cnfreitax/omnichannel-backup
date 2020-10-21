import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ISectorRepository from '@modules/company/repositories/ISectorRepository';
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

    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute(company_id: number, sector_id?: number): Promise<Chatline[]> {
    if (sector_id) {
      const company = await this.companyRepository.findById(company_id);
      const sector = await this.sectorRepository.findById(sector_id);
      if (!company || !sector) {
        throw new AppError('Company not found.');
      }
      const chats = await this.chatlineRepository.listAll(company_id, sector_id);
      return chats;
    }

    const company = await this.companyRepository.findById(company_id);
    if (!company) {
      throw new AppError('Company not found.');
    }

    const chats = await this.chatlineRepository.listAll(company_id);
    return chats;
  }
}
