import mockdate from 'mockdate';
import { IRecordRepository } from '../repository/IRecordRepository';
import RegisterCostumerContactService from './RegisterCostumerContactService';
import { mockRecordRepository, mockRecordParams, mockRecord, throwError } from '../test';

type SutTypes = {
  sut: RegisterCostumerContactService;
  recordRepositoryStub: IRecordRepository;
};

const mockSut = (): SutTypes => {
  const recordRepositoryStub = mockRecordRepository();
  const sut = new RegisterCostumerContactService(recordRepositoryStub);
  return {
    sut,
    recordRepositoryStub,
  };
};

describe('RegisterCostumerContact Service', () => {
  beforeEach(() => {
    mockdate.set(new Date());
  });

  afterEach(() => {
    mockdate.reset();
  });
  test('Should call create method from recordRepository with correct values', async () => {
    const { sut, recordRepositoryStub } = mockSut();
    const recordRepositorySpy = jest.spyOn(recordRepositoryStub, 'create');
    await sut.execute(mockRecordParams());
    expect(recordRepositorySpy).toHaveBeenCalledWith(mockRecordParams());
  });

  test('Should throws if contactRecordRepository throws', async () => {
    const { sut, recordRepositoryStub } = mockSut();
    jest.spyOn(recordRepositoryStub, 'create').mockImplementationOnce(throwError);
    const promise = sut.execute(mockRecordParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should return a ContactRecord on success', async () => {
    const { sut } = mockSut();
    const response = await sut.execute(mockRecordParams());
    expect(response).toEqual(mockRecord());
  });
});
