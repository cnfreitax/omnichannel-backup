import { container } from 'tsyringe';
import '@modules/user/providers';
import './providers';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import CompaniesRepository from '@modules/company/infra/typeorm/repositories/CompaniesRepository';
import ISectorRepository from '@modules/company/repositories/ISectorRepository';
import SectorRepository from '@modules/company/infra/typeorm/repositories/SectorRepository';
import IOptionRepository from '@modules/chatbot/repositories/IOptionRepository';
import OptionRepository from '@modules/chatbot/infra/typeorm/repositories/OptionRepository';
import IContainerRepository from '@modules/chatbot/repositories/IContainerRepository';
import ContainerRepository from '@modules/chatbot/infra/typeorm/repositories/ContainerRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ICompanyRepository>('CompaniesRepository', CompaniesRepository);
container.registerSingleton<ISectorRepository>('SectorRepository', SectorRepository);
container.registerSingleton<IOptionRepository>('OptionRepository', OptionRepository);
container.registerSingleton<IContainerRepository>('ContainerRepository', ContainerRepository);
