"use strict";
///README:
// Before you decrypt:
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = void 0;
//1. F inverse, f, and g are all computed.
//2. Thus, you can find 'a' instantly: a = f * cipher
//3. Then, compute the message = finverse * a and validate.
const functions_1 = require("./functions");
function decrypt(cipher, q, f, g) {
    // Compute and validate a:
    let a = f * cipher % q;
    if (a < 0 || a > q) {
        throw new Error("Decrypt function: 'a' value is out of valid intervals.");
    }
    // Compute fInverse modulo g:
    // * This doesn't have to be computed everytime. To reduce computation, it can be computed once and saved in program state.
    let fInverse = functions_1.inverseModulo(f, g);
    // Compute and validate the decrypted message:
    let message = fInverse * a % g;
    if (message < 0 || message > g) {
        throw new Error("Decrypt function: 'message' value is out of valid intervals.");
    }
    return message;
}
exports.decrypt = decrypt;
