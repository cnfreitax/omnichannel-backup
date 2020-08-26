import IHashProvider from '@modules/company/providers/HashProvider/models/IHashProvider';

export default class BcriptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, password: string): Promise<boolean> {
    return payload === password;
  }
}
