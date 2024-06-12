module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    },
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx'],
    transformIgnorePatterns: ['/node_modules/']
};
