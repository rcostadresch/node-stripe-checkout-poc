import express from 'express'

import { CheckoutController } from '@controller'

const checkoutRoutes = (http: express.Application): void => {
  http.post('/checkout/webhook', (req, res, next) => {
    /*
      #swagger.tags = ['Products']
      #swagger.security = [{
        "access_token": []
      }]
    */

    console.log('dispatched?')
    CheckoutController.webhook(req, res, next)
  })
}

export { checkoutRoutes }
