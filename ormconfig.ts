const path = require('path')
const { SnakeNamingStrategy } = require('typeorm-naming-strategies')

const ENVS = {
  DEV: 'development',
  TEST: 'test',
}

if (process.env.NODE_ENV != ENVS.TEST) {
  require(path.join('config', 'env'))
}

const rootDir = [ENVS.DEV, ENVS.TEST].includes(process.env.NODE_ENV) ? 'src' : 'dist/src'

module.exports = {
  url: process.env.DATABASE_URL,
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrationsRun: true,
  migrations: [path.join(rootDir, 'config/database/migrations/*.{js,ts}')],
  entities: [path.join(rootDir, 'api/core/models/**/*.{js,ts}')],
  cli: {
    migrationsDir: path.join(rootDir, 'config/database/migrations'),
    entitiesDir: path.join(rootDir, 'api/core/models'),
  },
  namingStrategy: new SnakeNamingStrategy(),
}
