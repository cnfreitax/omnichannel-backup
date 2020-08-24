import ICreateNotificationDTO from '@modules/notifications/dtos/INotificationsRepositoryDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notifcation';

export default interface INotificationRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
