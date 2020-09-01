import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/user/infra/typeorm/entities/User';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import ISectorRepository from '@modules/company/repositories/ISectorRepository';

interface Request {
  user_id: number;
  sector_id: number;
}

@injectable()
export default class AssignUserToSectorService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute({ user_id, sector_id }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not exist');
    }

    const sector = await this.sectorRepository.findById(sector_id);

    if (!sector) {
      throw new AppError('Sector non exist');
    }

    user.sector_id = sector_id;
    user.company_id = sector.company_id;

    return this.userRepository.save(user);
  }
}
