/* eslint-disable @typescript-eslint/no-explicit-any */

declare function describe(name: string, fn: () => void): void;
declare function test(name: string, fn: () => void): void;

declare function afterEach(fn: () => void | Promise<void>): void;
declare function beforeEach(fn: () => void | Promise<void>): void;

declare const expect: any;
declare const vi: any;
