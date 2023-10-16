import { NextFunction, Request, Response } from 'express'
import { Product, User } from '@models'
import { ErrorHandler } from 'errors/ErrorHandler'
import { httpStatusCodes, reasonPhrase } from 'errors/httpStatusCodes'
import Stripe from 'stripe'

const upsertGatewayProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findOne({ where: { email: 'robersoncosta96@gmail.com' } })
    const product = await Product.findOne({ where: { id: 'd4830fa2-2ed4-4d4b-8847-c4812092549e' } })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' })

    if (user.gateway_account_id) {
      const account = await stripe.accounts.retrieve(user.gateway_account_id)

      if (account) {
        const gatewayProduct = await stripe.products.create(
          {
            name: product.name,
            description: product.description,
            default_price_data: {
              currency: 'USD', // https://stripe.com/docs/currencies
              unit_amount: 2500, // $ 20,00
            },
            metadata: {
              app_product_id: product.id,
            },
            // images
            // url
          },
          {
            stripeAccount: account.id,
          }
        )

        product.gateway_product_id = gatewayProduct.id
        await product.save()

        const productPrice = await stripe.prices.retrieve(gatewayProduct.default_price as string, {
          stripeAccount: account.id,
        })
        const productPaymentLink = await stripe.paymentLinks.create(
          {
            line_items: [{ price: gatewayProduct.default_price as string, quantity: 1 }],
            application_fee_amount: (Number(process.env.STRIPE_CRU_FEE_PERCENTAGE) / 100) * productPrice.unit_amount,
          },
          {
            stripeAccount: account.id,
          }
        )

        product.gateway_product_uri = productPaymentLink.url
        await product.save()

        return
      }
    }
  } catch (error) {
    next(new ErrorHandler(error, httpStatusCodes.BAD_REQUEST, reasonPhrase.BAD_REQUEST))
  }
}

export { upsertGatewayProduct }
