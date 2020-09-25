import { inject, injectable } from 'tsyringe';

import IContainerRepository from '@modules/chatbot/repositories/IContainerRepository';

import Container, { ContainerType } from '@modules/chatbot/infra/typeorm/entities/Container';
import AppError from '@shared/errors/AppError';
import IUpdateContainerDTO from '../dtos/IUpdateContainerDTO';

@injectable()
export default class UpdateContainerService {
  constructor(
    @inject('ContainerRepository')
    private containerRepository: IContainerRepository,
  ) {}

  public async execute(containerData: IUpdateContainerDTO): Promise<Container> {
    const container = await this.containerRepository.findById(containerData.id);

    if (!container) {
      throw new AppError('Container not found');
    }

    if (containerData.description) {
      container.description = containerData.description;
    }

    if (containerData.to) {
      const childContainer = await this.containerRepository.findById(containerData.to);

      if (!childContainer) {
        throw new AppError('Child container does not exist');
      }

      container.to = containerData.to;
    }

    if (containerData.from) {
      const parentContainer = await this.containerRepository.findById(containerData.from);

      if (!parentContainer) {
        throw new AppError('Parent container does not exist');
      }

      container.from = containerData.from;
    }

    if (containerData.content) {
      const containerContent = containerData.content;

      if (container.type === ContainerType.MEDIA) {
        if (!containerContent.media) {
          throw new AppError('Invalid content type');
        }

        container.content = { media: containerContent.media };
      } else if (container.type === ContainerType.API) {
        if (!containerContent.link) {
          throw new AppError('Invalid content type');
        }

        container.content = { api: containerContent.api };
      } else if (container.type === ContainerType.MENU) {
        if (!containerContent.options) {
          throw new AppError('Invalid content type');
        }

        container.content = { options: containerContent.options };
      }
    }

    if (containerData.expects_input) {
      container.expects_input = containerData.expects_input;
    }

    const updatedContainer = await this.containerRepository.save(container);

    return updatedContainer;
  }
}
