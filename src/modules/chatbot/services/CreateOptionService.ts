import { inject, injectable } from 'tsyringe';
import IOptionRepository from '../repositories/IOptionRepository';
import Option from '../infra/typeorm/entities/Option';

interface IRequest {
  description: string;
  container_id: number;
}

@injectable()
export default class CreateOptionService {
  constructor(
    @inject('OptionRepository')
    private optionRepository: IOptionRepository,
  ) {}

  public async execute({ description, container_id }: IRequest): Promise<Option> {
    const option = this.optionRepository.create({ description, container_id });
    return option;
  }
}
