"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("@modules/chatbot/infra/http/routes"));
const routes_2 = __importDefault(require("@modules/user/infra/http/routes"));
const routes_3 = __importDefault(require("@modules/company/infra/http/routes"));
const message_routes_1 = __importDefault(require("@modules/messageHandler/infra/http/routes/message.routes"));
const routes_4 = __importDefault(require("@modules/chat/infra/http/routes"));
const handleChat_1 = __importDefault(require("@modules/chat/infra/http/routes/handleChat"));
const router = express_1.Router();
const routesList = [routes_1.default, routes_2.default, routes_3.default, routes_4.default];
// TODO DELETE TEST ROUTE LATER
message_routes_1.default.get('/', (req, res) => {
    const query = req.query;
    console.log(query);
    return res.json({ description: 'Message de teste para teste api' });
});
router.use('/', message_routes_1.default);
router.use('/', handleChat_1.default);
for (const route of routesList) {
    router.use('/api', route);
}
exports.default = router;
