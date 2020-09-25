import ICreateAvailableUserDTO from '@modules/user/dtos/ICreateAvailableUserDTO';
import IAvailableUser from '@modules/user/repositories/IAvailableUser';
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

  public async find(company_id: string, user_id: string): Promise<Available | undefined> {
    const user = await this.ormRepository.findOne({ where: { company_id, user_id } });
    return user;
  }

  public async save(user: Available): Promise<void> {
    await this.ormRepository.save(user);
  }
}
