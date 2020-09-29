"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
exports.default = (app) => {
    app.use(middlewares_1.cors);
    app.use(middlewares_1.bodyParse);
    app.use(middlewares_1.contentType);
    app.use(middlewares_1.raterLimiter);
};
