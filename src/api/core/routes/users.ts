import express from 'express'

import { UserController } from '@controller'

const userRoutes = (http: express.Application): void => {
  http.post('/users/upsert-gateway-account', (req, res, next) => {
    /*
      #swagger.tags = ['Users']
      #swagger.security = [{
        "access_token": []
      }]
    */

    UserController.upsertGatewayAccount(req, res, next)
  })

  http.post('/users/upsert-gateway-customer', (req, res, next) => {
    /*
      #swagger.tags = ['Users']
      #swagger.security = [{
        "access_token": []
      }]
    */

    UserController.upsertGatewayCustomer(req, res, next)
  })
}

export { userRoutes }
