module.exports = {
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.app.json' }],
	},
	setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/jest.setup.js'],
	moduleNameMapper: { '\\.(css|scss)$': 'identity-obj-proxy' },
};