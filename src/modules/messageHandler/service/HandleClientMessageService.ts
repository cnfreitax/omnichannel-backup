import { inject, injectable } from 'tsyringe';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import AppError from '@shared/errors/AppError';
import ICustomerRepository from '@modules/customer/repository/ICustomerRepository';
import IContainerRepository from '@modules/chatbot/repositories/IContainerRepository';
import Containers, { ContainerType } from '@modules/chatbot/infra/typeorm/entities/Container';
import IMessageProvider from '@shared/container/providers/MessageProvider/models/IMessageProvider';
import { ISendMessageDTO } from '@shared/container/providers/MessageProvider/dtos/ISendDTO';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';
import Company from '@modules/company/infra/typeorm/entities/Company';
import IClientMessageDTO from '../dtos/IClientMessageDTO';
import ICustomerStageRepository from '../repository/ICustomerStage';

@injectable()
export default class HandleClientMessageService {
  constructor(
    @inject('CompaniesRepository')
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

  private messages: ISendMessageDTO[] = [];

  public async readMessageFromDatabase(container: Containers, customer: Customer, company: Company): Promise<Array<ISendMessageDTO>> {
    if (!container) {
      throw new AppError('No container found');
    }

    return this.messagesToSend(container, customer, company);
  }

  public async messagesToSend(messageFromDatabase: Containers, customer: Customer, company: Company): Promise<Array<ISendMessageDTO>> {
    let messageDescription = messageFromDatabase.description;

    if (messageFromDatabase.type === ContainerType.MENU) {
      if (messageFromDatabase.content.options) {
        messageFromDatabase.content.options.forEach((option, index) => {
          messageDescription = messageDescription.concat(`\n${index + 1}. ${option.description}`);
        });
      }
    }

    this.messages.push({
      token: '16c3ced2',
      Telephone: customer.phone,
      codCampaign: company.codCampaign,
      Message: messageDescription,
    });

    if (messageFromDatabase.to && !messageFromDatabase.expects_input) {
      return this.readMessageFromDatabase(messageFromDatabase, customer, company);
    }

    const currentStage = await this.customerStageRepository.findStage(company.id, customer.id);

    if (currentStage) {
      currentStage.container_id = messageFromDatabase.id;
      await this.customerStageRepository.updateStage(currentStage);
    }

    return this.messages;
  }

  public async execute(data: IClientMessageDTO): Promise<void> {
    let customer;
    let message;

    const company = await this.companyRepository.findByCodCampaign(data.codCampaign);
    if (!company) {
      throw new AppError('Company not found');
    }

    customer = await this.customerRepository.findByPhone(data.Telephone);

    if (!customer) {
      customer = await this.customerRepository.create({ phone: data.Telephone });
    }

    let verifyStage = await this.customerStageRepository.findStage(company.id, customer.id);
    if (!verifyStage) {
      message = await this.containerRepository.findExistingContainer({ company_id: company.id, type: ContainerType.GREETING });
      if (!message) {
        throw new AppError('Container not found');
      }
      verifyStage = await this.customerStageRepository.create({ company_id: company.id, container_id: message.id, customer_id: customer.id });
    } else {
      message = await this.containerRepository.findById(verifyStage.container_id);
      if (!message) {
        throw new AppError('Not found');
      }
    }

    const messagesToSend = await this.readMessageFromDatabase(message, customer, company);

    console.log('MESSAGES', messagesToSend);

    await this.sendMessage.send(messagesToSend);
  }
}
