import { container } from 'tsyringe';
import '@modules/user/providers';
import './providers';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
