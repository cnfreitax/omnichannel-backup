import { container } from 'tsyringe';

import UploadMediaProvider from './implementations/UploadMediaProvider';
import IUploadMediaProvider from './models/IUploadMediaProvider';

container.registerSingleton<IUploadMediaProvider>('UploadMediaProvider', UploadMediaProvider);
