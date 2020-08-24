import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IstorageProvider';

import DiskstorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskstorageProvider';

const providers = {
  disk: DiskstorageProvider,
};

container.registerSingleton<IStorageProvider>('StorageProvider', providers[uploadConfig.driver]);
