import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IOptionRepository from '../repositories/IOptionRepository';
import Option from '../infra/typeorm/entities/Option';
import IContainerRepository from '../repositories/IContainerRepository';

interface IRequest {
  description: string;
  container_id: number;
}

@injectable()
export default class CreateOptionService {
  constructor(
    @inject('OptionRepository')
    private optionRepository: IOptionRepository,

    @inject('ContainerRepository')
    private containerRepository: IContainerRepository,
  ) {}

  public async execute({ description, container_id }: IRequest): Promise<Option> {
    const containerExists = await this.containerRepository.findById(container_id);
    if (!containerExists) {
      throw new AppError('Container not exists');
    }

    const option = await this.optionRepository.create({ description, container_id });

    return option;
  }
}
