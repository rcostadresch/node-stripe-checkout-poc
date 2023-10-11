import 'express-async-errors'
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const application: express.Application = express()

application.use(cors())
application.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
application.use(bodyParser.json({ limit: '10mb' }))

process.stdout.write(`Loaded => express\n`)

export default application
