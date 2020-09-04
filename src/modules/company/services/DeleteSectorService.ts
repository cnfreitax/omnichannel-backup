import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ISectorRepository from '../repositories/ISectorRepository';
import Sector from '../infra/typeorm/entities/Sector';

@injectable()
export default class DeleteSectorService {
  constructor(
    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute(id: number): Promise<Sector> {
    const sector = await this.sectorRepository.findById(id);
    if (!sector) {
      throw new AppError('Sector not found.');
    }
    this.sectorRepository.del(sector);
    return sector;
  }
}
