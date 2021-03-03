export declare function validateParams(f: number, g: number, q: number): boolean;
export declare function gcd(number: number, modulo: number): number;
export declare function extendedGcd(number: number, modulo: number): {
    gcd: number;
    x: number;
    y: number;
};
export declare function inverseModulo(number: number, modulo: number): number;
export declare function generateRandomValue(from: number, to: number): number;
export declare function generateKey(f: number, g: number, q: number): number;
export declare function generateSecretIntegers(q: number): {
    f: number;
    g: number;
};
