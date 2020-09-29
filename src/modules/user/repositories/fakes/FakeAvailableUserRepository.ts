import ICreateAvailableUserDTO from '@modules/user/dtos/ICreateAvailableUserDTO';
import Available from '@modules/user/infra/typeorm/entities/Available';
import IAvailableUser from '../IAvailableUser';

export default class FakeAvailableUserRepository implements IAvailableUser {
  private availableUsers: Available[] = [];

  public async create(data: ICreateAvailableUserDTO): Promise<Available> {
    const available = new Available();
    const date = new Date();
    const id = date.getTime() + Math.round(Math.random() * 100);
    Object.assign(available, { id, data });

    this.availableUsers.push(available);

    return available;
  }

  public async findById(id: number): Promise<Available | undefined> {
    const available = this.availableUsers.find(availableUser => availableUser.id === id);
    return available;
  }

  public async save(userAvailable: Available): Promise<void> {
    const index = this.availableUsers.findIndex(selectedUser => selectedUser.id === userAvailable.id);
    this.availableUsers[index] = userAvailable;
  }

  public async delete(user_id: number): Promise<void> {
    const index = this.availableUsers.findIndex(availableUser => availableUser.id === user_id);
    this.availableUsers.splice(index);
  }

  public async find(user_id: number, company_id: number): Promise<Available | undefined> {
    const available = this.availableUsers.find(availableUser => availableUser.id === user_id && availableUser.company_id === company_id);
    return available;
  }

  public async listAttendants(company_id: number): Promise<Available[]> {
    const users = this.availableUsers.filter(user => user.company_id === company_id);
    return users;
  }
}
