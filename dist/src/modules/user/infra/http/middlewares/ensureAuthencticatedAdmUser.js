"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("@config/auth"));
function ensureAuthenticatedAdmUser(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default('JWT token is missing', 401);
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        const { sub, access_level } = decoded;
        if (access_level !== 'adm') {
            throw new AppError_1.default('This route is only for Adm users');
        }
        const id = sub;
        express_1.request.user = {
            id,
        };
        return next();
    }
    catch (err) {
        if (err instanceof AppError_1.default) {
            throw new AppError_1.default('This route is only for Adm users');
        }
        throw new AppError_1.default('Invalid JWT token!!!', 401);
    }
}
exports.default = ensureAuthenticatedAdmUser;
