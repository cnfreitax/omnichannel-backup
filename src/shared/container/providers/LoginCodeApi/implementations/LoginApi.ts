import AppError from '@shared/errors/AppError';
import Axios from 'axios';
import { ILoginDTO, ResponseLogin } from '../dtos/ILoginDTO';
import ILoginProvider from '../models/ILoginProvider';

export default class LoginApi implements ILoginProvider {
  public async login({ login, password }: ILoginDTO): Promise<ResponseLogin> {
    const loginData = () => ({
      login,
      password,
    });

    try {
      const resp = await Axios.post<ResponseLogin>(process.env.LOGIN_API || 'default', loginData());
      const responseData = {
        token: resp.data.token,
        validate: resp.data.validate,
      };

      return responseData;
    } catch (err) {
      throw new AppError('Server Error');
    }
  }
}
