import { container } from 'tsyringe';

import IHashProvider from '@modules/company/providers/HashProvider/models/IHashProvider';
import BcriptHashProvider from '@modules/company/providers/HashProvider/implementations/BcriptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcriptHashProvider);
