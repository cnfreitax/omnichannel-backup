import { inject, injectable } from 'tsyringe';
import ISaveMediaToContainerDTO from '@modules/chatbot/dtos/ISaveMediaToContainerDTO';
import IContainerRepository from '@modules/chatbot/repositories/IContainerRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import Container, { ContainerType } from '@modules/chatbot/infra/typeorm/entities/Container';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUploadMediaProvider from '@shared/container/providers/UploadMediaProvider/models/IUploadMediaProvider';

@injectable()
export default class CreateMediaContainerService {
  constructor(
    @inject('UploadMediaProvider')
    private uploadMediaProvider: IUploadMediaProvider,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('ContainerRepository')
    private containerRepository: IContainerRepository,
    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(containerData: ISaveMediaToContainerDTO): Promise<Container> {
    const company = await this.companyRepository.findById(containerData.company_id);
    let container = await this.containerRepository.findById(containerData.container_id);

    if (!company) {
      throw new AppError('Company not found');
    }

    if (!container) {
      throw new AppError('Container not found');
    }

    if (container.type !== ContainerType.MEDIA) {
      throw new AppError('Wrong message type');
    }

    if (!containerData.mediaFileName) {
      throw new AppError('Missing media file');
    }

    const fileName = await this.storageProvider.saveFile(containerData.mediaFileName);

    const uploadedFileInfo = await this.uploadMediaProvider.upload(fileName);

    container.content = {
      media: uploadedFileInfo,
    };

    const updatedContainer = await this.containerRepository.save(container);

    return updatedContainer;
  }
}
