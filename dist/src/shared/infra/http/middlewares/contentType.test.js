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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../config/app"));
describe('Content Type Middleware', () => {
    test('Should return default content type as json ', () => __awaiter(void 0, void 0, void 0, function* () {
        app_1.default.get('/test_content_type', (req, res) => {
            res.send();
        });
        yield supertest_1.default(app_1.default).get('/test_content_type').expect('content-type', /json/);
    }));
    test('Should return xml type when forced ', () => __awaiter(void 0, void 0, void 0, function* () {
        app_1.default.get('/test_content_type_xml', (req, res) => {
            res.type('xml');
            res.send();
        });
        yield supertest_1.default(app_1.default).get('/test_content_type_xml').expect('content-type', /xml/);
    }));
});
