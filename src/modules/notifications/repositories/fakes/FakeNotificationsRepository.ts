import { ObjectID } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import INotificationsRepositoryDTO from '@modules/notifications/dtos/INotificationsRepositoryDTO';

import Notifcation from '@modules/notifications/infra/typeorm/schemas/Notifcation';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifcations: Notifcation[] = [];

  public async create({ content, recipient_id }: INotificationsRepositoryDTO): Promise<Notifcation> {
    const notification = new Notifcation();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notifcations.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
