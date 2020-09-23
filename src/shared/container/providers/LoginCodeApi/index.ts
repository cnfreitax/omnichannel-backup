import { container } from 'tsyringe';
import LoginApi from './implementations/LoginApi';
import ILoginProvider from './models/ILoginProvider';

container.registerSingleton<ILoginProvider>('LoginAPI', LoginApi);
