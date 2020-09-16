import { container } from 'tsyringe';
import SendMessageProvider from './implementations/SendMessageProvider';
import IMessageProvider from './models/IMessageProvider';

container.registerSingleton<IMessageProvider>('SendMessage', SendMessageProvider);
