import { injectable, inject } from 'tsyringe';
import Sector from '@modules/company/infra/typeorm/entities/Sector';
import AppError from '@shared/errors/AppError';
import ISectorRepository from '@modules/company/repositories/ISectorRepository';
import ICompanyRepository from '../repositories/ICompanyRepository';

@injectable()
export default class ListAllCompanySectorsService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompanyRepository,
    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute(company_id: number): Promise<Sector[] | undefined> {
    const companyExists = await this.companiesRepository.findById(company_id);

    if (!companyExists) {
      throw new AppError('Company does not exist');
    }

    const allSectors = await this.sectorRepository.findAllCompanySectors(company_id);

    return allSectors;
  }
}
