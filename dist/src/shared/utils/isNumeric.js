"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNumeric(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}
exports.default = isNumeric;
