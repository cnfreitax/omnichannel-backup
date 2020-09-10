import { inject, injectable } from 'tsyringe';
import Option from '@modules/chatbot/infra/typeorm/entities/Option';
import AppError from '@shared/errors/AppError';
import IOptionRepository from '../repositories/IOptionRepository';
import IContainerRepository from '../repositories/IContainerRepository';

interface IRequest {
  optionId: number;
  description: string;
  to?: number;
}

@injectable()
export default class UpdateOptionService {
  constructor(
    @inject('OptionRepository')
    private optionRepository: IOptionRepository,

    @inject('ContainerRepository')
    private containerRepository: IContainerRepository,
  ) {}

  public async execute({ optionId, description, to }: IRequest): Promise<Option> {
    const option = await this.optionRepository.findById(optionId);

    if (!option) {
      throw new AppError('Option not found');
    }

    if (to) {
      const destinyExists = await this.containerRepository.findById(to);
      if (!destinyExists) {
        throw new AppError('Destiny does not exists ');
      }
      option.to = to;
    }
    option.description = description;
    return this.optionRepository.save(option);
  }
}
