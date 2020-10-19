import AppError from '@shared/errors/AppError';
import UpdateOptionService from './UpdateOptionService';
import FakeOptionRepository from '../repositories/fakes/FakeOptionRepository';
import FakeContainerRepository from '../repositories/fakes/FakeContainerRepository';
import CreateOptionService from './CreateOptionService';
import ISaveContainerDTO from '../dtos/ISaveContainerDTO';
import { ContainerType } from '../infra/typeorm/entities/Container';

let fakeOptionRepository: FakeOptionRepository;
let fakeContainerRepository: FakeContainerRepository;
let createOption: CreateOptionService;
let updateOption: UpdateOptionService;

const makeFakeRequestContainer = (): ISaveContainerDTO => ({
  company_id: 1,
  description: 'any_description',
  type: ContainerType.MENU,
});

const makeOptionRequest = (containerId: number) => ({
  container_id: containerId,
  description: 'any_description',
});

describe('UpdateOption Service', () => {
  beforeEach(() => {
    fakeOptionRepository = new FakeOptionRepository();
    fakeContainerRepository = new FakeContainerRepository();
    createOption = new CreateOptionService(fakeOptionRepository, fakeContainerRepository);
    updateOption = new UpdateOptionService(fakeOptionRepository, fakeContainerRepository);
  });
  test('Should be able update description if correct values if provided', async () => {
    const container = await fakeContainerRepository.create(makeFakeRequestContainer());
    const option = await createOption.execute(makeOptionRequest(container.id));
    await updateOption.execute({ optionId: option.id, description: 'new_description' });
    expect(option.description).toBe('new_description');
  });

  test('Should returns throws if Option not found', async () => {
    await expect(updateOption.execute({ optionId: 0, description: 'new_description' })).rejects.toBeInstanceOf(AppError);
  });

  test('Should update destiny if destiny id is provided', async () => {
    const containerDestiny = await fakeContainerRepository.create({
      company_id: 1,
      description: 'any_description',
      type: ContainerType.MENU,
    });
    const container = await fakeContainerRepository.create(makeFakeRequestContainer());
    const option = await createOption.execute(makeOptionRequest(container.id));
    await updateOption.execute({ optionId: option.id, to: containerDestiny.id, description: 'any_description' });
    expect(option.to).toEqual(containerDestiny.id);
  });

  test('Should returns throws if invalid destiny connectiom is provided', async () => {
    const container = await fakeContainerRepository.create(makeFakeRequestContainer());
    const option = await createOption.execute(makeOptionRequest(container.id));
    await expect(updateOption.execute({ optionId: option.id, to: 100, description: 'any_description' })).rejects.toBeInstanceOf(AppError);
  });
});
