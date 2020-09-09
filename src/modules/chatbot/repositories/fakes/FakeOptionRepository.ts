import Option from '@modules/chatbot/infra/typeorm/entities/Option';
import ICreateOptionDTO from '@modules/chatbot/dtos/ICreateOptionDTO';
import IOptionRepository from '../IOptionRepository';

export default class FakeOptionRepository implements IOptionRepository {
  private readonly options: Option[] = [];

  public async findById(id: number): Promise<Option | undefined> {
    const option = this.options.find(foundOption => foundOption.id === id);
    return option;
  }

  public async create({ container_id, description }: ICreateOptionDTO): Promise<Option> {
    const option = new Option();
    Object.assign(option, { id: this.options.length + 1, description, container_id });
    this.options.push(option);
    return option;
  }

  public async save(option: Option): Promise<Option> {
    const index = this.options.findIndex(selectedUser => selectedUser.id === option.id);
    this.options[index] = option;
    return option;
  }
}
