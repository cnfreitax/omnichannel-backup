import ICreateOptionDTO from '../dtos/ICreateOptionDTO';
import Option from '../infra/typeorm/entities/Option';

export default interface IOptionRepository {
  create(data: ICreateOptionDTO): Promise<Option>;
  findById(id: number): Promise<Option | undefined>;
  save(option: Option): Promise<Option>;
}
