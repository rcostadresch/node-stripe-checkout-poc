import path from 'path'
import { default as dotenv } from 'dotenv-safe'

const envTypes = {
  DEV: 'development',
  TEST: 'test',
}

const ENV: string = process.env.NODE_ENV || envTypes.DEV || envTypes.TEST

if ([envTypes.DEV, envTypes.TEST].includes(ENV)) {
  dotenv.config({
    path: path.join(__dirname, `../config/.env.${ENV}`),
    sample: path.join(__dirname, '../config/.env.example'),
  })
}

process.stdout.write(`Loaded => enviroment: ${process.env.NODE_ENV}\n`)

export default dotenv
