import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import Available from '@modules/user/infra/typeorm/entities/Available';
import IAvailableUser from '@modules/user/repositories/IAvailableUser';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListaAvailableAttendants {
  constructor(
    @inject('AvailableUser')
    private availableRepository: IAvailableUser,

    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(company_id: number): Promise<Available[]> {
    let usersAvailable: Available[] = [];

    const company = await this.companyRepository.findById(company_id);
    if (!company) {
      throw new AppError('Company not found. Try again.');
    }

    const usersCompany = await this.availableRepository.listAttendants(company.id);
    usersCompany.map(user => {
      if (user.available === true) {
        usersAvailable.push(user);
      }
    });

    return usersAvailable;
  }
}
