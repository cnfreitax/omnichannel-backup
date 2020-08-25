import AppError from '@shared/errors/AppError';

import FakeChatbotRepository from '@modules/chatbot/repositories/fakes/FakeChatbotRepository';
import CreateEndOfChatbotMessageService from './CreateEndOfChatbotMessage.service';
import { MessageType } from '../infra/typeorm/entities/Message';

let fakeChatbotRepository: FakeChatbotRepository;
let createEndOfChatbot: CreateEndOfChatbotMessageService;

describe('CreateEndOfChatbotMessage', () => {
  beforeEach(() => {
    fakeChatbotRepository = new FakeChatbotRepository();
    createEndOfChatbot = new CreateEndOfChatbotMessageService(fakeChatbotRepository);
  });

  it('should be able to create a end of chatbot message', async () => {
    const message = await createEndOfChatbot.execute({
      company_id: 1,
      text: 'Obrigado pelo seu contato',
      type: MessageType.END_CHATBOT,
    });

    expect(message).toHaveProperty('id');
    expect(message.type).toEqual(MessageType.END_CHATBOT);
  });

  it('should not be able to create a end of chatbot message with a non existing parent-id', async () => {
    await expect(
      createEndOfChatbot.execute({
        company_id: 1,
        parent_id: 1,
        text: 'Obrigado pelo seu contato',
        type: MessageType.END_CHATBOT,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a end of chatbot message with a non existing company-id', async () => {
    await expect(
      createEndOfChatbot.execute({
        company_id: 1,
        text: 'Obrigado pelo seu contato',
        type: MessageType.END_CHATBOT,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
