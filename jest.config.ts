import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@models$': '<rootDir>/src/api/core/models/',
    '^@controller$': '<rootDir>/src/api/core/controller/',
    '^@utils$': '<rootDir>/src/api/core/utils/',
  },
}
export default config
