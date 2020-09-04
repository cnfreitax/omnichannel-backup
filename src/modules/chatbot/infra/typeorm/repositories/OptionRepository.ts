import { getRepository, Repository } from 'typeorm';
import IOptionRepository from '@modules/chatbot/repositories/IOptionRepository';
import ICreateOptionDTO from '@modules/chatbot/dtos/ICreateOptionDTO';
import Option from '../entities/Option';

export default class OptionRepository implements IOptionRepository {
  private ormRepository: Repository<Option>;

  constructor() {
    this.ormRepository = getRepository(Option);
  }

  public async create(data: ICreateOptionDTO): Promise<Option> {
    const message = this.ormRepository.create(data);
    await this.ormRepository.save(message);
    return message;
  }

  public async findById(id: number): Promise<Option | undefined> {
    const option = await this.ormRepository.findOne({ where: { id } });
    return option;
  }

  public async save(option: Option): Promise<Option> {
    return this.ormRepository.save(option);
  }
}
