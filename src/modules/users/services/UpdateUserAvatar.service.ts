import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IstorageProvider from '@shared/container/providers/StorageProvider/models/IstorageProvider';

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IstorageProvider,

    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new AppError('Only autenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);
    user.avatar = fileName;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
