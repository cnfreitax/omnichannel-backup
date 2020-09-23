import { inject, injectable } from 'tsyringe';
import ISaveMediaContainerDTO from '@modules/chatbot/dtos/ISaveMediaContainerDTO';
import IContainerRepository from '@modules/chatbot/repositories/IContainerRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import Container, { ContainerType } from '@modules/chatbot/infra/typeorm/entities/Container';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

@injectable()
export default class CreateMediaContainerService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('ContainerRepository')
    private containerRepository: IContainerRepository,
    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(containerData: ISaveMediaContainerDTO): Promise<Container> {
    let containerInfo = containerData;
    const company = await this.companyRepository.findById(containerData.company_id);

    if (!company) {
      throw new AppError('Company not found');
    }

    if (containerData.from) {
      const parentContainer = await this.containerRepository.findById(containerData.from);

      if (!parentContainer) {
        throw new AppError('Parent message does not exist');
      }
    }

    if (containerData.type !== ContainerType.MEDIA) {
      throw new AppError('Wrong message type');
    }

    const fileName = await this.storageProvider.saveFile(containerInfo.mediaFileName);

    containerInfo.content = {
      path: fileName,
    };

    const container = await this.containerRepository.create(containerInfo);

    return container;
  }
}
