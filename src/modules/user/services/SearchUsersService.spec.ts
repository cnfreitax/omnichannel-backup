import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import SearchUsersService from './SearchUsersService';

let fakeUserRepository: FakeUserRepository;
let searchUsers: SearchUsersService;

describe('Search Users', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    searchUsers = new SearchUsersService(fakeUserRepository);
  });

  it('shoud be able to search users by name', async () => {
    await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
      access_level: 'adm',
    });

    await fakeUserRepository.create({
      email: 'mm@email.com',
      name: 'Mario',
      password: '123456',
      access_level: 'adm',
    });

    const foundUsers = await searchUsers.execute({
      name: 'Eduardo',
    });

    expect(foundUsers).toHaveLength(1);
  });

  it('shoud be able to search users by email', async () => {
    await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
      access_level: 'adm',
    });

    await fakeUserRepository.create({
      email: 'mm@email.com',
      name: 'Mario',
      password: '123456',
      access_level: 'adm',
    });

    const foundUsers = await searchUsers.execute({
      email: 'mm@email.com',
    });

    expect(foundUsers).toHaveLength(1);
  });

  it('shoud be able to search users by both', async () => {
    await fakeUserRepository.create({
      email: 'jj@email.com',
      name: 'Eduardo',
      password: '123456',
      access_level: 'adm',
    });

    await fakeUserRepository.create({
      email: 'mm@email.com',
      name: 'Mario',
      password: '123456',
      access_level: 'adm',
    });

    const foundUsers = await searchUsers.execute({
      name: 'Mario',
      email: 'mm@email.com',
    });

    expect(foundUsers).toHaveLength(1);
  });
});
