import { getRepository, Repository } from 'typeorm';

import IContainerRepository from '@modules/chatbot/repositories/IContainerRepository';

import Container from '@modules/chatbot/infra/typeorm/entities/Container';
import ISaveContainerDTO from '@modules/chatbot/dtos/ISaveContainerDTO';
import IFindExistingContainerDTO from '@modules/chatbot/dtos/IFindExistingContainerDTO';

class ContainerRepository implements IContainerRepository {
  private ormRepository: Repository<Container>;

  constructor() {
    this.ormRepository = getRepository(Container);
  }

  public async findById(id: number): Promise<Container | undefined> {
    const container = await this.ormRepository.findOne({ where: { id } });

    return container;
  }

  public async listAllCompanyContainers(company_id: number): Promise<Container[]> {
    const containers = await this.ormRepository.find({ where: { company_id } });

    return containers;
  }

  public async findExistingContainer({ company_id, type }: IFindExistingContainerDTO): Promise<Container | undefined> {
    const container = await this.ormRepository.findOne({ where: { company_id, type } });

    return container;
  }

  public async create({ company_id, description, type, from, to }: ISaveContainerDTO): Promise<Container> {
    const container = this.ormRepository.create({ company_id, description, type, from: from || undefined, to: to || undefined });

    await this.ormRepository.save(container);

    return container;
  }

  public async save(container: Container): Promise<Container> {
    return this.ormRepository.save(container);
  }
}

export default ContainerRepository;
