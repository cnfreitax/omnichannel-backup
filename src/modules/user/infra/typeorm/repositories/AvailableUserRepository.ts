import ICreateAvailableUserDTO from '@modules/user/dtos/ICreateAvailableUserDTO';
import IAvailableUser from '@modules/user/repositories/IAvailableUser';
import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import Available from '../entities/Available';

export default class AvailableUserRepository implements IAvailableUser {
  private ormRepository: Repository<Available>;

  constructor() {
    this.ormRepository = getRepository(Available);
  }

  public async create(data: ICreateAvailableUserDTO): Promise<Available> {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }

  public async findById(user_id: number): Promise<Available | undefined> {
    const user = await this.ormRepository.findOne({ where: { user_id } });
    return user;
  }

  public async find(company_id: string, user_id: string): Promise<Available | undefined> {
    const user = await this.ormRepository.findOne({ where: { company_id, user_id } });
    return user;
  }

  public async save(user: Available): Promise<void> {
    await this.ormRepository.save(user);
  }

  public async delete(user_id: number): Promise<void> {
    const user = await this.ormRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new AppError('Not found');
    }
    await this.ormRepository.delete(user.id);
  }

  public async listAttendants(company_id: number): Promise<Available[]> {
    const users = await this.ormRepository.find({ where: { company_id } });
    return users;
  }
}
