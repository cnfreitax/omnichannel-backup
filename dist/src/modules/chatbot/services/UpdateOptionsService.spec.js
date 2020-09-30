"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const UpdateOptionService_1 = __importDefault(require("./UpdateOptionService"));
const FakeOptionRepository_1 = __importDefault(require("../repositories/fakes/FakeOptionRepository"));
const FakeContainerRepository_1 = __importDefault(require("../repositories/fakes/FakeContainerRepository"));
const CreateOptionService_1 = __importDefault(require("./CreateOptionService"));
const Container_1 = require("../infra/typeorm/entities/Container");
let fakeOptionRepository;
let fakeContainerRepository;
let createOption;
let updateOption;
const makeFakeRequestContainer = () => ({
    company_id: 1,
    description: 'any_description',
    type: Container_1.ContainerType.MENU,
});
const makeOptionRequest = (containerId) => ({
    container_id: containerId,
    description: 'any_description',
});
describe('UpdateOption Service', () => {
    beforeEach(() => {
        fakeOptionRepository = new FakeOptionRepository_1.default();
        fakeContainerRepository = new FakeContainerRepository_1.default();
        createOption = new CreateOptionService_1.default(fakeOptionRepository, fakeContainerRepository);
        updateOption = new UpdateOptionService_1.default(fakeOptionRepository, fakeContainerRepository);
    });
    test('Should be able update description if correct values if provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const container = yield fakeContainerRepository.create(makeFakeRequestContainer());
        const option = yield createOption.execute(makeOptionRequest(container.id));
        yield updateOption.execute({ optionId: option.id, description: 'new_description' });
        expect(option.description).toBe('new_description');
    }));
    test('Should returns throws if Option not found', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(updateOption.execute({ optionId: 0, description: 'new_description' })).rejects.toBeInstanceOf(AppError_1.default);
    }));
    test('Should update destiny if destiny id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const containerDestiny = yield fakeContainerRepository.create({
            company_id: 1,
            description: 'any_description',
            type: Container_1.ContainerType.MENU,
        });
        const container = yield fakeContainerRepository.create(makeFakeRequestContainer());
        const option = yield createOption.execute(makeOptionRequest(container.id));
        yield updateOption.execute({ optionId: option.id, to: containerDestiny.id, description: 'any_description' });
        expect(option.to).toEqual(containerDestiny.id);
    }));
    test('Should returns throws if invalid destiny connectiom is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const container = yield fakeContainerRepository.create(makeFakeRequestContainer());
        const option = yield createOption.execute(makeOptionRequest(container.id));
        yield expect(updateOption.execute({ optionId: option.id, to: 100, description: 'any_description' })).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
