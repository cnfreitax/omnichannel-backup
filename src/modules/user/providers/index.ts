import { container } from 'tsyringe';

import IHashProvider from '@modules/user/providers/HashProvider/models/IHashProvider';
import BcriptHashProvider from '@modules/user/providers/HashProvider/implementations/BcriptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcriptHashProvider);
