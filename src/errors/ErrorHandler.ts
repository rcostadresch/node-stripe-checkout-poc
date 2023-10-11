import { httpStatusCodes, reasonPhrase as reason } from './httpStatusCodes'

export class ErrorHandler {
  public readonly message: string

  public readonly statusCode: number

  public readonly reasonPhrase: string

  constructor(message: string, statusCode = httpStatusCodes.BAD_REQUEST, reasonPhrase = reason.BAD_REQUEST) {
    this.message = message.toString()
    this.statusCode = statusCode
    this.reasonPhrase = reasonPhrase.toString()
  }
}
