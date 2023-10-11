import express from 'express'
import connection from './config/database/connection'

let app: Application | null = null

class Application {
  public project: string
  public http: express.Application

  constructor() {
    this.project = 'cru'
    this.config().then(async () => {
      const { http } = await import('interfaces')
      const { routes } = await import('api/core/routes/index')

      this.http = http

      routes(http)
    })
  }

  private async config(): Promise<void> {
    await import('config/env')
    await connection.create()
  }
}

function getServer(): Application {
  if (app !== null) return app

  app = new Application()
  return app
}

export default getServer()
