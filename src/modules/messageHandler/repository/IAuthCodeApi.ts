import ICreateToken from '@modules/messageHandler/dtos/ICreateToken';
import TokenAccess from '../infra/typeorm/entities/TokenAccess';

export interface IAuthCodeApi {
  findToken(): Promise<TokenAccess | undefined>;
  updateToken(token: ICreateToken): Promise<void>;
}
