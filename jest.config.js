module.exports = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/index.ts'
    ],
    coveragePathIgnorePatterns: [
        '.*\\.d\\.ts'
    ],
    testMatch: [
        '<rootDir>/src/**/*.spec.ts'
    ],
    // This configuration is used to defeat the problem:
    //  Jest-haste-map: @providesModule naming collision:
    //   Duplicate module name: core-ui-kit
    //   Paths: C:\dev\projects\ams\core-ui-kit\dist\package.json collides with
    //      C:\dev\projects\ams\core-ui-kit\package.json
    //  This warning is caused by a @providesModule declaration with the same name across two different files.
    modulePathIgnorePatterns: [
        '<rootDir>/dist/'
    ],
    setupFiles: [
        '<rootDir>/config/jest/setup/console.setup.js'
    ],
    transform: {
        '^(?!.*\\.(js|ts|tsx|css|json)$)': '<rootDir>/config/jest/transform/file.transform.js',
        '^.+\\.css$': '<rootDir>/config/jest/transform/css.transform.js',
        '^.+\\.ts$': '<rootDir>/config/jest/transform/typescript.transform.js'
    },
    moduleFileExtensions: [
        'ts',
        'js',
        'node'
    ],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.spec.json'
        }
    },
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
};
