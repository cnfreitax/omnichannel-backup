import { ILoginDTO, ResponseLogin } from '../dtos/ILoginDTO';

export default interface ILoginProvider {
  login(data: ILoginDTO): Promise<ResponseLogin>;
}
