import { container } from 'tsyringe';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import CompaniesRepository from '@modules/company/infra/typeorm/repositories/CompaniesRepository';

import ISectorRepository from '@modules/company/repositories/ISectorRepository';
import SectorRepository from '@modules/company/infra/typeorm/repositories/SectorRepository';

container.registerSingleton<ICompanyRepository>('CompaniesRepository', CompaniesRepository);

container.registerSingleton<ISectorRepository>('SectorRepository', SectorRepository);
