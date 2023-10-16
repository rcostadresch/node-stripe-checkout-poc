import express from 'express'

import { ProductController } from '@controller'

const productRoutes = (http: express.Application): void => {
  http.post('/products/upsert-gateway-product', (req, res, next) => {
    /*
      #swagger.tags = ['Products']
      #swagger.security = [{
        "access_token": []
      }]
    */

    ProductController.upsertGatewayProduct(req, res, next)
  })
}

export { productRoutes }
