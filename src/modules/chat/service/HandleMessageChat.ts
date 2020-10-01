import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ICustomerRepository from '@modules/customer/repository/ICustomerRepository';
import { IAuthCodeApi } from '@modules/messageHandler/repository/IAuthCodeApi';
import IAvailableUser from '@modules/user/repositories/IAvailableUser';
import ILoginProvider from '@shared/container/providers/LoginCodeApi/models/ILoginProvider';
import IMessageProvider from '@shared/container/providers/MessageProvider/models/IMessageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IChatlineRepository from '../repository/IChatlineRepository';

interface IRequest {
  message: string;
  attendantId: number;
}

@injectable()
export default class HandleMessageChat {
  constructor(
    @inject('AvailableUser')
    private availableRepository: IAvailableUser,

    @inject('SendMessage')
    private sendMessage: IMessageProvider,

    @inject('AuthCodeApi')
    private authApi: IAuthCodeApi,

    @inject('LoginAPI')
    private loginApi: ILoginProvider,

    @inject('ChatlineRepository')
    private chatlineRepository: IChatlineRepository,

    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,

    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  private token: string;

  public async execute({ message, attendantId }: IRequest): Promise<void> {
    const attendant = await this.availableRepository.findById(attendantId);
    if (!attendant) {
      throw new AppError('Attendant not found');
    }

    const tokenValidate = await this.authApi.checkTokenValidate();
    if (!tokenValidate) {
      const newToken = await this.loginApi.login({ login: String(process.env.API_USERNAME), password: String(process.env.API_PASSWORD) });
      this.token = newToken.token;
    } else {
      const validToken = await this.authApi.findToken();
      if (!validToken) {
        throw new AppError('Token not found');
      }
      this.token = validToken.token;
    }

    const chatDatails = await this.chatlineRepository.findByAttendant(attendant.id);
    if (!chatDatails) {
      throw new AppError('Not found');
    }

    const company = await this.companyRepository.findById(chatDatails.company_id);
    if (!company) {
      throw new AppError('Company not found');
    }

    const customer = await this.customerRepository.findById(chatDatails.customer_id);
    if (!customer) {
      throw new AppError('Not found');
    }

    await this.sendMessage.send([
      {
        token: this.token,
        Telephone: customer.phone,
        codCampaign: company.codCampaign,
        Message: message,
      },
    ]);
  }
}
