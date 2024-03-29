"use strict";
///README:
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = void 0;
// Before you encrypt:
//1. Generate the secret integers using the selected q value:
// let secretIntegers = generateSecretIntegers(q);
// let { f, g } = secretIntegers;
//2. Now you can generate the key, h:
// let h = generateKey(f, g, q);
//3. Now you can use the key and q to encrypt the message.
// let cipher = encrypt(ASCII of plain text, q, h);
const functions_1 = require("./functions");
function encrypt(message, q, h, r) {
    // Check the message before performing other computations:
    if (message < 0 || message > Math.floor(Math.sqrt(q / 4))) {
        throw new Error("Encrypt function: 'message' value is out of valid intervals.");
    }
    // Generate random, r:
    let randomValue = r || functions_1.generateRandomValue(1, Math.floor(Math.sqrt(q / 2)));
    // Encrypt the message:
    let cipher = (h * randomValue + message) % q;
    return cipher;
}
exports.encrypt = encrypt;
