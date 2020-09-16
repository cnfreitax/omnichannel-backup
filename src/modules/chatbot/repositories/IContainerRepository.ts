import ISaveContainerDTO from '@modules/chatbot/dtos/ISaveContainerDTO';
import IFindExistingContainerDTO from '@modules/chatbot/dtos/IFindExistingContainerDTO';
import Container from '@modules/chatbot/infra/typeorm/entities/Container';

export default interface IContainerRepository {
  findExistingContainer(data: IFindExistingContainerDTO): Promise<Container | undefined>;
  findById(id: number): Promise<Container | undefined>;
  listAllCompanyContainers(company_id: number): Promise<Container[]>;
  create(data: ISaveContainerDTO): Promise<Container>;
  save(container: Container): Promise<Container>;
}
