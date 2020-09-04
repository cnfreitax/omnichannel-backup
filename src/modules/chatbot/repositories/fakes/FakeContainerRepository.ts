import IContainerRepository from '@modules/chatbot/repositories/IContainerRepository';
import ISaveContainerDTO from '@modules/chatbot/dtos/ISaveContainerDTO';
import IFindExistingContainerDTO from '@modules/chatbot/dtos/IFindExistingContainerDTO';

import Container from '@modules/chatbot/infra/typeorm/entities/Container';

class FakeContainerRepository implements IContainerRepository {
  private containers: Container[] = [];

  public async findById(id: number): Promise<Container | undefined> {
    const container = this.containers.find(foundContainer => foundContainer.id === id);

    return container;
  }

  public async create({ company_id, description, type, from, to }: ISaveContainerDTO): Promise<Container> {
    const container = new Container();

    Object.assign(container, { id: this.containers.length + 1, company_id, from, to, description, type });

    this.containers.push(container);

    return container;
  }

  public async findExistingContainer({ company_id, type }: IFindExistingContainerDTO): Promise<Container | undefined> {
    const container = this.containers.find(foundContainer => foundContainer.company_id === company_id && foundContainer.type === type);

    return container;
  }
}

export default FakeContainerRepository;
