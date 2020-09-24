import { getRepository, Repository } from 'typeorm';
import { IAuthCodeApi } from '@modules/messageHandler/repository/IAuthCodeApi';
import ICreateToken from '@modules/messageHandler/dtos/ICreateToken';
import { isAfter } from 'date-fns';
import TokenAccess from '../entities/TokenAccess';

export default class AuthCodeApi implements IAuthCodeApi {
  private readonly ormRepository: Repository<TokenAccess>;

  constructor() {
    this.ormRepository = getRepository(TokenAccess);
  }

  public async findToken(): Promise<TokenAccess | undefined> {
    const token = await this.ormRepository.findOne();
    return token;
  }

  public async updateToken(token: ICreateToken): Promise<void> {
    const tokens = await this.ormRepository.find();
    for (const tokenSelected of tokens) {
      this.ormRepository.delete(tokenSelected);
    }

    await this.ormRepository.save(token);
  }

  public async checkTokenValidate(): Promise<boolean> {
    const token = await this.ormRepository.findOne();
    if (!token) {
      return false;
    }
    const dateNow = new Date();
    const tokenValidadeFormat = Date.parse(token.validade);
    return isAfter(dateNow, tokenValidadeFormat);
  }
}
