import { injectable, inject } from 'tsyringe';

import Sector from '@modules/company/infra/typeorm/entities/Sector';

import AppError from '@shared/errors/AppError';
import ISectorRepository from '@modules/company/repositories/ISectorRepository';
import ICompanyRepository from '../repositories/ICompanyRepository';

interface IRequest {
  label: string;
  phone: string;
  company_id: number;
}

@injectable()
class CreateSectorService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompanyRepository,

    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute({ company_id, label, phone }: IRequest): Promise<Sector> {
    const companyExists = await this.companiesRepository.findById(company_id);

    if (!companyExists) {
      throw new AppError('Company does not exist');
    }

    const sector = await this.sectorRepository.create({
      company_id,
      label,
      phone,
    });

    return sector;
  }
}

export default CreateSectorService;
