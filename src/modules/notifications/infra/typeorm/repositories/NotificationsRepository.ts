import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import INotificationsRepositoryDTO from '@modules/notifications/dtos/INotificationsRepositoryDTO';

import Notifcation from '@modules/notifications/infra/typeorm/schemas/Notifcation';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notifcation>;

  constructor() {
    this.ormRepository = getMongoRepository(Notifcation, 'mongo');
  }

  public async create({ content, recipient_id }: INotificationsRepositoryDTO): Promise<Notifcation> {
    const notification = this.ormRepository.create({ content, recipient_id });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
