"use strict";
// Function that validates the parameters f, g, and q:
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSecretIntegers = exports.generateKey = exports.generateRandomValue = exports.inverseModulo = exports.extendedGcd = exports.gcd = exports.validateParams = void 0;
function validateParams(f, g, q) {
    if (gcd(f, g) != 1) {
        return false;
    }
    if (gcd(f, g * q) != 1) {
        return false;
    }
    return true;
}
exports.validateParams = validateParams;
// Function to compute the basic GCD of two numbers:
function gcd(number, modulo) {
    if (!modulo) {
        return number;
    }
    return gcd(modulo, number % modulo);
}
exports.gcd = gcd;
// Function to compute the extended GCD of two numbers:
function extendedGcd(number, modulo) {
    if (number == 0) {
        return { gcd: modulo, x: 0, y: 1 };
    }
    let gcdOutput = extendedGcd(modulo % number, number);
    let gcd = gcdOutput.gcd;
    let x1 = gcdOutput.x;
    let y1 = gcdOutput.y;
    let x = y1 - Math.floor(modulo / number) * x1;
    let y = x1;
    gcd = Math.floor(gcd);
    x = Math.floor(x);
    y = Math.floor(y);
    return { gcd: gcd, x: x, y: y };
}
exports.extendedGcd = extendedGcd;
// Function that compute the multiplicative inverse of two numbers with respect to modulo:
function inverseModulo(number, modulo) {
    let gcdOutput = extendedGcd(number, modulo);
    let gcd = gcdOutput.gcd;
    let x = gcdOutput.x;
    let y = gcdOutput.y;
    if (x == NaN || x == undefined) {
        throw new Error("inverseModulo function: 'x' value is not valid.");
    }
    if (y == NaN || y == undefined) {
        throw new Error("inverseModulo function: 'y' value is not valid.");
    }
    if (gcd == 1) {
        // If the inverse is negative, transform it to positive form:
        if (x < 0)
            return (modulo + x) % modulo;
        else
            return x % modulo;
    }
    else
        throw new Error("inverseModulo function: inverse not found.");
}
exports.inverseModulo = inverseModulo;
// Function to generate a random value in a specific range:
function generateRandomValue(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
}
exports.generateRandomValue = generateRandomValue;
// Function to generate the key, h:
function generateKey(f, g, q) {
    // Find f inverse modulo q:
    let fInverse = inverseModulo(f, q);
    // Generate the key, h modulo q:
    let h = (fInverse * g) % q;
    return h;
}
exports.generateKey = generateKey;
// Function that generates the secret integers, f and g:
function generateSecretIntegers(q) {
    let qSquareroot2 = Math.floor(Math.sqrt(q / 2));
    let qSquareroot4 = Math.floor(Math.sqrt(q / 4));
    // Generate secret integers f and g:
    let fValue = generateRandomValue(1, qSquareroot2 - 1);
    let gValue = generateRandomValue(qSquareroot4 + 1, qSquareroot2 - 1);
    let paramValidity = validateParams(fValue, gValue, q);
    // Keep trying to find values that satisfy NTRU rules:
    // Note: the while-statement might not need to execute, reducing computation time.
    while (paramValidity != true) {
        fValue = generateRandomValue(1, qSquareroot2 - 1);
        gValue = generateRandomValue(qSquareroot4 + 1, qSquareroot2 - 1);
        paramValidity = validateParams(fValue, gValue, q);
    }
    return { f: fValue, g: gValue };
}
exports.generateSecretIntegers = generateSecretIntegers;
