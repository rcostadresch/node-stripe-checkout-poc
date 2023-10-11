import * as HTTPServer from 'http'
import http from 'interfaces/express'

const server: HTTPServer.Server = HTTPServer.createServer(http)

server.listen(process.env.PORT)

process.stdout.write(`Interfaces on PORT => ${process.env.PORT}\n`)

// AWS LOAD BALANCE FIX
server.keepAliveTimeout = 61 * 1000
server.headersTimeout = 65 * 1000

export { http }
