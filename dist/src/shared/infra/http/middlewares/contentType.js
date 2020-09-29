"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentType = void 0;
exports.contentType = (req, res, next) => {
    res.type('json');
    next();
};
