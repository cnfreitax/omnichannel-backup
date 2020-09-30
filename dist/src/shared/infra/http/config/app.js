"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("@config/upload"));
const celebrate_1 = require("celebrate");
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const middlewares_1 = __importDefault(require("./middlewares"));
const routes_1 = __importDefault(require("../routes"));
const app = express_1.default();
app.post('/whatsapp/response', express_1.default.raw({ type: '*/*' }));
app.post('/whatsapp/status', express_1.default.raw({ type: '*/*' }));
middlewares_1.default(app);
app.use(celebrate_1.errors());
app.use(routes_1.default);
app.use((err, req, res, _) => {
    console.log(err);
    if (err instanceof AppError_1.default) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Server Error',
    });
});
app.use('/files', express_1.default.static(upload_1.default.uploadsFolder));
exports.default = app;
