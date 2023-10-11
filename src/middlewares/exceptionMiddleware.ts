import { ErrorHandler } from '../errors/ErrorHandler'
import { NextFunction, Request, Response } from 'express'
import logger from '../errors/log/logger'
import { httpStatusCodes, reasonPhrase } from '../errors/httpStatusCodes'

export function exceptionMiddleware(err: Error, request: Request, response: Response, next: NextFunction): Response {
  logger.error(err.stack)

  if (err instanceof ErrorHandler) {
    return response.status(err.statusCode).json({ status: err.reasonPhrase, message: err.message })
  }

  return response
    .status(httpStatusCodes.INTERNAL_SERVER)
    .json({ status: reasonPhrase.INTERNAL_SERVER, message: err.message })
}
