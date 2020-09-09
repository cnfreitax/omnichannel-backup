"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_routes_1 = __importDefault(require("@modules/chatbot/infra/http/routes/container.routes"));
const greeting_routes_1 = __importDefault(require("@modules/chatbot/infra/http/routes/greeting.routes"));
const survey_routes_1 = __importDefault(require("@modules/chatbot/infra/http/routes/survey.routes"));
const endChatbot_routes_1 = __importDefault(require("@modules/chatbot/infra/http/routes/endChatbot.routes"));
const option_routes_1 = __importDefault(require("./option.routes"));
const routes = express_1.Router();
routes.use('/container', container_routes_1.default);
routes.use('/greeting', greeting_routes_1.default);
routes.use('/survey', survey_routes_1.default);
routes.use('/end-chatbot', endChatbot_routes_1.default);
routes.use('/option', option_routes_1.default);
exports.default = routes;
