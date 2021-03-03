"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKey = void 0;
const functions_1 = require("./functions");
function generateKey(f, g, q) {
    const fInverse = functions_1.inverseModulo(f, q);
    return (fInverse * g) % q;
}
exports.generateKey = generateKey;
