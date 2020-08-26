import { container } from 'tsyringe';

import ICompaniesRepository from '@modules/company/repositories/ICompanyRepository';
import CompaniesRepository from '@modules/company/infra/typeorm/repositories/CompaniesRepository';

container.registerSingleton<ICompaniesRepository>('CompaniesRepository', CompaniesRepository);
