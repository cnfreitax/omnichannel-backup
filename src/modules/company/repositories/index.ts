import { container } from 'tsyringe';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import CompaniesRepository from '@modules/company/infra/typeorm/repositories/CompaniesRepository';

container.registerSingleton<ICompanyRepository>('CompaniesRepository', CompaniesRepository);
