import { container } from 'tsyringe';

import IContainerRepository from '@modules/chatbot/repositories/IContainerRepository';
import ContainerRepository from '@modules/chatbot/infra/typeorm/repositories/ContainerRepository';

container.registerSingleton<IContainerRepository>('ContainerRepository', ContainerRepository);
