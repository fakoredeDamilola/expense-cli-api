"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    preset: "ts-jest/presets/default-esm",
    transform: {
        "^.+\\.ts$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.json",
                useESM: true,
            },
        ],
    },
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    testPathIgnorePatterns: ["<rootDir>/dist/"],
};
