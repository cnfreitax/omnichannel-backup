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
const mongodb_1 = require("mongodb");
const Notifcation_1 = __importDefault(require("@modules/notifications/infra/typeorm/schemas/Notifcation"));
class FakeNotificationsRepository {
    constructor() {
        this.notifcations = [];
    }
    create({ content, recipient_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = new Notifcation_1.default();
            Object.assign(notification, { id: new mongodb_1.ObjectID(), content, recipient_id });
            this.notifcations.push(notification);
            return notification;
        });
    }
}
exports.default = FakeNotificationsRepository;
