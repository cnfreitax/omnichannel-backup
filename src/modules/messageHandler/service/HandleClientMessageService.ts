import { isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import Axios from 'axios';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import AppError from '@shared/errors/AppError';
import ICustomerRepository from '@modules/customer/repository/ICustomerRepository';
import IContainerRepository from '@modules/chatbot/repositories/IContainerRepository';
import Containers, { ContainerType } from '@modules/chatbot/infra/typeorm/entities/Container';
import IMessageProvider from '@shared/container/providers/MessageProvider/models/IMessageProvider';
import { ISendMessageDTO } from '@shared/container/providers/MessageProvider/dtos/ISendMessageDTO';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';
import Company from '@modules/company/infra/typeorm/entities/Company';
import isNumeric from '@shared/utils/isNumeric';
import IUploadMediaProvider from '@shared/container/providers/UploadMediaProvider/models/IUploadMediaProvider';
import ILoginProvider from '@shared/container/providers/LoginCodeApi/models/ILoginProvider';
import IChatlineRepository from '@modules/chat/repository/IChatlineRepository';
import ISurveyAnswerRepository from '@modules/chatbot/repositories/ISurveyAnswerRepository';
import Sector from '@modules/company/infra/typeorm/entities/Sector';
import ISectorRepository from '@modules/company/repositories/ISectorRepository';
import IClientMessageDTO from '../dtos/IClientMessageDTO';
import ICustomerStageRepository from '../repository/ICustomerStage';
import { IAuthCodeApi } from '../repository/IAuthCodeApi';

interface ApiInterface {
  [key: string]: string;
}

@injectable()
export default class HandleClientMessageService {
  constructor(
    @inject('UploadMediaProvider')
    private uploadMediaProvider: IUploadMediaProvider,

    @inject('CompaniesRepository')
    private companyRepository: ICompanyRepository,

    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,

    @inject('CustomerStageRepository')
    private customerStageRepository: ICustomerStageRepository,

    @inject('ContainerRepository')
    private containerRepository: IContainerRepository,

    @inject('ChatlineRepository')
    private chatlineRepository: IChatlineRepository,

    @inject('SendMessage')
    private sendMessage: IMessageProvider,

    @inject('AuthCodeApi')
    private authApi: IAuthCodeApi,

    @inject('LoginAPI')
    private loginApi: ILoginProvider,

    @inject('SurveyAnswerRepository')
    private surveyAnswerRepository: ISurveyAnswerRepository,

    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  private messages: ISendMessageDTO[] = [];

  private apiMessagesToSend: string[] = [];

  private token: string;

  public async checkCustomerExistsInChatline(customer: Customer, company: Company, customer_message: string): Promise<boolean> {
    let clientInChatline = await this.chatlineRepository.findChatline(company.id, customer.id);

    if (clientInChatline) {
      if (clientInChatline.is_attended) {
        await this.sendMessage.sendToAttendant({ Message: customer_message, Telephone: customer.phone });
      }
      return true;
    }
    return false;
  }

  public async addCustomerToChatline(customer: Customer, company: Company, sector: Sector): Promise<void> {
    await this.chatlineRepository.create({
      company_id: company.id,
      customer_id: customer.id,
      sector_id: sector.id,
    });
  }

  public async readMessageFromDatabase(container_id: number, customer: Customer, company: Company): Promise<Array<ISendMessageDTO>> {
    const container = await this.containerRepository.findById(container_id);
    if (!container) {
      throw new AppError('No container found');
    }

    return this.messagesToSend(container, customer, company);
  }

  public async messagesToSend(messageFromDatabase: Containers, customer: Customer, company: Company): Promise<Array<ISendMessageDTO>> {
    let messageDescription = messageFromDatabase.description;

    if (this.apiMessagesToSend.length > 0) {
      this.apiMessagesToSend.forEach(apiMessage => {
        this.messages.push({
          token: this.token,
          Telephone: customer.phone,
          codCampaign: company.codCampaign,
          Message: apiMessage,
        });
      });

      this.apiMessagesToSend = [];
    }

    if (messageFromDatabase.type === ContainerType.MENU) {
      if (messageFromDatabase.content.options) {
        messageFromDatabase.content.options.forEach((option, index) => {
          messageDescription = messageDescription.concat(`\n${index + 1}. ${option.description}`);
        });
      }

      this.messages.push({
        token: this.token,
        Telephone: customer.phone,
        codCampaign: company.codCampaign,
        Message: messageDescription,
      });
    } else if (messageFromDatabase.type === ContainerType.MEDIA) {
      if (messageFromDatabase.content.media) {
        let containerMedia = messageFromDatabase.content.media;
        const mediaValidDate = Date.parse(containerMedia.validUntil);
        const expiredMedia = isAfter(new Date(), mediaValidDate);

        if (expiredMedia) {
          const uploadedFileInfo = await this.uploadMediaProvider.upload(containerMedia.nomeArquivo);

          messageFromDatabase.content = {
            media: uploadedFileInfo,
          };

          messageFromDatabase = await this.containerRepository.save(messageFromDatabase);
        }

        this.messages.push({
          token: this.token,
          Telephone: customer.phone,
          codCampaign: company.codCampaign,
          Type: 'image',
          idMedia: containerMedia.idMedia,
        });
      }
    } else if (messageFromDatabase.type === ContainerType.CHAT) {
      let messageSectorIndex: string;
      messageSectorIndex = 'Por favor escolha o código do setor e aguarde seu atendimento: ';
      const sectors = await this.sectorRepository.findAllCompanySectors(company.id);
      if (!sectors) {
        throw new AppError('Sectors not found');
      }
      for (const sector of sectors) {
        messageSectorIndex = messageSectorIndex.concat(`\n${sector.id}. ${sector.label}`);
      }

      this.messages.push({
        token: this.token,
        Telephone: customer.phone,
        codCampaign: company.codCampaign,
        Message: messageSectorIndex,
      });
    } else {
      this.messages.push({
        token: this.token,
        Telephone: customer.phone,
        codCampaign: company.codCampaign,
        Message: messageDescription,
      });
    }

    if (messageFromDatabase.to && !messageFromDatabase.expects_input) {
      return this.readMessageFromDatabase(messageFromDatabase.to, customer, company);
    }

    const currentStage = await this.customerStageRepository.findStage(company.id, customer.id);

    if (currentStage) {
      currentStage.container_id = messageFromDatabase.id;
      await this.customerStageRepository.updateStage(currentStage);

      if (messageFromDatabase.type === ContainerType.END_CHATBOT) {
        await this.customerStageRepository.deleteStage(currentStage.id);
      }
    }

    return this.messages;
  }

  public async checkUserInput(message: Containers, userInput: IClientMessageDTO): Promise<Containers | undefined> {
    if (message.type === ContainerType.MENU) {
      if (isNumeric(userInput.message)) {
        const menuOptions = message.content.options ? message.content.options : [];
        const userChosenOption = Number(userInput.message);

        if (userChosenOption > 0 && userChosenOption <= menuOptions.length) {
          const nextMessageId = menuOptions[userChosenOption - 1].container_id;

          return this.containerRepository.findById(nextMessageId);
        }
      }
    } else if (message.type === ContainerType.API) {
      const apiInfo = message.content.api ? message.content.api : { url: '', param: '' };
      const apiParam: ApiInterface = {};

      if (apiInfo.param) {
        apiParam[apiInfo.param] = userInput.message;
      }

      await Axios.get(apiInfo.url, {
        params: {
          ...apiParam,
        },
      })
        .then(resp => {
          this.apiMessagesToSend.push(resp.data.description);
          return this.containerRepository.findById(message.to);
        })
        .catch(_err => {
          throw new AppError('Unable to contact api');
        });
    } else if (message.type === ContainerType.SURVEY) {
      if (isNumeric(userInput.message)) {
        const userAnswer = Number(userInput.message);
        const customer = await this.customerRepository.findByPhone(userInput.Telephone);
        const company = await this.companyRepository.findByCodCampaign(userInput.codCampaign);

        if (!customer || !company) {
          throw new AppError('Error finding message');
        }

        await this.surveyAnswerRepository.create({
          company_id: company.id,
          customer_id: customer.id,
          survey_answer: userAnswer,
        });

        return this.containerRepository.findById(message.to);
      }
    } else if (message.type === ContainerType.CHAT) {
      if (isNumeric(userInput.message)) {
        const sector = await this.sectorRepository.findById(Number(userInput.message));
        const customer = await this.customerRepository.findByPhone(userInput.Telephone);
        const company = await this.companyRepository.findByCodCampaign(userInput.codCampaign);

        if (!customer || !company) {
          throw new AppError('Error finding message');
        }

        if (!sector) {
          throw new AppError('Error finding sector');
        }

        this.addCustomerToChatline(customer, company, sector);
      }
    }

    return message;
  }

  public async execute(data: IClientMessageDTO): Promise<void> {
    let customer;
    let message;
    let currentStage;

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

    const company = await this.companyRepository.findByCodCampaign(data.codCampaign);
    if (!company) {
      throw new AppError('Company not found');
    }

    customer = await this.customerRepository.findByPhone(data.Telephone);
    if (!customer) {
      customer = await this.customerRepository.create({ phone: data.Telephone });
    }

    const isInChat = await this.checkCustomerExistsInChatline(customer, company, data.message);

    if (!isInChat) {
      currentStage = await this.customerStageRepository.findStage(company.id, customer.id);
      if (!currentStage) {
        message = await this.containerRepository.findExistingContainer({ company_id: company.id, type: ContainerType.GREETING });
        if (!message) {
          throw new AppError('Container not found');
        }
        currentStage = await this.customerStageRepository.create({ company_id: company.id, container_id: message.id, customer_id: customer.id });
      } else {
        message = await this.containerRepository.findById(currentStage.container_id);
        if (!message) {
          throw new AppError('Container not found');
        } else if (message.expects_input) {
          message = await this.checkUserInput(message, data);

          if (!message) {
            throw new AppError('No next container');
          }
        }
      }
      const messagesToSend = await this.readMessageFromDatabase(message.id, customer, company);
      await this.sendMessage.send(messagesToSend);
    }
  }
}
