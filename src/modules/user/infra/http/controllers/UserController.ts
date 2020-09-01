import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/user/services/CreateUserService';
import ListUsersService from '@modules/user/services/ListUsersService';
import SearchUsers from '@modules/user/services/SearchUsersService';
import ISearchUserDTO from '@modules/user/dtos/ISearchUsersDTO';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const { access_level } = req.params;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      access_level,
      password,
    });

    return res.json(classToClass(user));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { company_id, sector_id } = req.query;
    const listUser = container.resolve(ListUsersService);

    const companyIdFormat = Number(company_id);
    const sectorIdFormat = Number(sector_id);

    const userList = await listUser.execute({ company_id: companyIdFormat, sector_id: sectorIdFormat });

    return res.json(userList);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.query as ISearchUserDTO;

    const searchUsers = container.resolve(SearchUsers);

    const usersList = await searchUsers.execute({ name, email });

    return res.json(usersList);
  }
}
