import { NextFunction } from 'express'
import { ErrorHandler } from 'errors/ErrorHandler'
import { httpStatusCodes, reasonPhrase } from 'errors/httpStatusCodes'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const handleDatabaseError = (error: any, next: NextFunction): void => {
  //If the error is a SQLSTATE
  if (error.code) {
    switch (error.code) {
      case '23505': // Duplicity
        next(new ErrorHandler(error.detail, httpStatusCodes.CONFLICT, reasonPhrase.CONFLICT))
        break
      default: // unkown error, so return 500
        next(error)
    }
  }

  next(error)
}
