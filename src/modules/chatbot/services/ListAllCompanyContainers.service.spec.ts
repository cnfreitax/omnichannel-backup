import FakeContainerRepository from '@modules/chatbot/repositories/fakes/FakeContainerRepository';
import FakeCompanyRepository from '@modules/company/repositories/fakes/FakeCompanyRepository';

import ListAllCompanyContainersService from '@modules/chatbot/services/ListAllCompanyContainersService';

import { ContainerType } from '@modules/chatbot/infra/typeorm/entities/Container';
import AppError from '@shared/errors/AppError';

let fakeContainerRepository: FakeContainerRepository;
let fakeCompanyRepository: FakeCompanyRepository;
let listAllCompanyContainersService: ListAllCompanyContainersService;

describe('CreateGreetings', () => {
  beforeEach(() => {
    fakeContainerRepository = new FakeContainerRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    listAllCompanyContainersService = new ListAllCompanyContainersService(fakeContainerRepository, fakeCompanyRepository);
  });

  it('should be able to list company containers', async () => {
    const company = await fakeCompanyRepository.create({
      name: 'Company Doe',
      cnpj: '123123',
    });

    await fakeContainerRepository.create({
      company_id: company.id,
      description: 'O que voce quer?',
      type: ContainerType.MENU,
    });

    const containers = await listAllCompanyContainersService.execute(company.id);

    expect(containers).toHaveLength(1);
  });

  it('should not be able to list company containers from non existing company', async () => {
    await expect(listAllCompanyContainersService.execute(9)).rejects.toBeInstanceOf(AppError);
  });
});
