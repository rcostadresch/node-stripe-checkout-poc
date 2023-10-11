const httpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER: 500,
  SERVICE_UNAVAILABLE: 503,
}

const reasonPhrase = {
  OK: 'OK',
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  CONFLICT: 'Conflict',
  INTERNAL_SERVER: 'Internal Server Error',
  SERVICE_UNAVAILABLE: 'Service Unavailable',
}

export { httpStatusCodes, reasonPhrase }
