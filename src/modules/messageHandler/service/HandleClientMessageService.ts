import { inject, injectable } from 'tsyringe';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import AppError from '@shared/errors/AppError';
import ICustomerRepository from '@modules/customer/repository/ICustomerRepository';
import IContainerRepository from '@modules/chatbot/repositories/IContainerRepository';
import { ContainerType } from '@modules/chatbot/infra/typeorm/entities/Container';
import IMessageProvider from '@shared/container/providers/MessageProvider/models/IMessageProvider';
import IClientMessageDTO from '../dtos/IClientMessageDTO';
import ICustomerStageRepository from '../repository/ICustomerStage';

@injectable()
export default class HandleClientMessageService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,

    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,

    @inject('CustomerStageRepository')
    private customerStageRepository: ICustomerStageRepository,

    @inject('ContainerRepository')
    private containerRepository: IContainerRepository,

    @inject('SendMessage')
    private sendMessage: IMessageProvider,
  ) {}

  public async execute(data: IClientMessageDTO): Promise<void> {
    let customer;
    let message;
    const company = await this.companyRepository.findByCodCampaign(data.codCampaign);
    console.log('COMPANY', company);
    if (!company) {
      throw new AppError('Company not found');
    }
    customer = await this.customerRepository.findByPhone(data.Telephone);
    console.log('COSTUMER', customer);
    if (!customer) {
      customer = await this.customerRepository.create({ phone: data.Telephone });
    }

    const verifyStage = await this.customerStageRepository.findStage(company.id, customer.id);
    console.log('VERIFY', verifyStage);
    if (!verifyStage) {
      message = await this.containerRepository.findExistingContainer({ company_id: company.id, type: ContainerType.GREETING });
      console.log('GREETING MESSAGE', message);
      if (!message) {
        throw new AppError('Container not found');
      }
      await this.customerStageRepository.create({ company_id: company.id, container_id: message.id, customer_id: customer.id });
    } else {
      message = await this.containerRepository.findById(verifyStage.container_id);
      console.log('MESSAGE', message);
      if (!message) {
        throw new AppError('Not found');
      }
    }

    console.log('SENDING');

    await this.sendMessage.send({
      token: 'd398dc45',
      Telephone: customer.phone,
      codCampaign: company.codCampaign,
      Message: message?.description,
    });
  }
}
