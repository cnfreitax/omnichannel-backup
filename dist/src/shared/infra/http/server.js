"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const celebrate_1 = require("celebrate");
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const rateLimiter_1 = __importDefault(require("@shared/infra/http/middleware/rateLimiter"));
const upload_1 = __importDefault(require("@config/upload"));
const routes_1 = __importDefault(require("./routes"));
require("@shared/infra/typeorm");
require("@shared/container");
const port = process.env.PORT || 3333;
const app = express_1.default();
app.use(express_1.default.json());
app.use(rateLimiter_1.default);
app.use(routes_1.default);
app.use(celebrate_1.errors());
app.use((err, req, res, _) => {
    if (err instanceof AppError_1.default) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.error(err);
    return res.status(500).json({
        status: 'error',
        message: 'Server Error',
    });
});
app.use('/files', express_1.default.static(upload_1.default.uploadsFolder));
// eslint-disable-next-line
app.listen(port, () => console.log(`✔✔ server running on  ${port}!`));
