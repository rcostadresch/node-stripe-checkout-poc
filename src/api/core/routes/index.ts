import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from 'swagger/swagger_output.json'

import { ErrorHandler } from 'errors/ErrorHandler'
import { exceptionMiddleware } from 'middlewares'
import { httpStatusCodes, reasonPhrase } from 'errors/httpStatusCodes'

function routes(http: express.Application): void {
  http.get('/health', (req, res, next) => {
    const health = {
      uptime: process.uptime(),
      response_time: process.hrtime(),
      message: 'OK',
      timestamp: Date.now(),
    }
    try {
      res.send(health)
    } catch (error) {
      health.message = error
      next(new ErrorHandler(error, httpStatusCodes.SERVICE_UNAVAILABLE, reasonPhrase.SERVICE_UNAVAILABLE))
    }
  })

  http.use(
    '/swagger',
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile, { swaggerOptions: { persistAuthorization: true } })
  )

  http.use(exceptionMiddleware)
}

export { routes }
