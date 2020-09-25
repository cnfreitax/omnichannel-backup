import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IAvailableUser from '../repositories/IAvailableUser';

@injectable()
export default class LogoutCommonUserService {
  constructor(
    @inject('AvailableUser')
    private availableUser: IAvailableUser,
  ) {}

  public async execute(user_id: number): Promise<void> {
    const user = await this.availableUser.findById(user_id);
    if (!user) {
      throw new AppError('User is not logged in');
    }

    try {
      await this.availableUser.delete(user_id);
    } catch (err) {
      throw new AppError('Error to logout, try again.');
    }
  }
}
