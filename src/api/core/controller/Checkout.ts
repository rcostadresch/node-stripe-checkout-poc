import { NextFunction, Request, Response } from 'express'
import { ErrorHandler } from 'errors/ErrorHandler'
import { httpStatusCodes, reasonPhrase } from 'errors/httpStatusCodes'
import Stripe from 'stripe'

const webhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { body } = req

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' })

    const paymentIntent = await stripe.paymentIntents.retrieve(
      'pi_3O1uozPrx2Pbziei04cyx9yl',
      { expand: ['latest_charge'] },
      {
        stripeAccount: body.account,
      }
    )

    const latestCharge = paymentIntent.latest_charge as Stripe.Charge
    const receiptUrl = latestCharge.receipt_url
  } catch (error) {
    next(new ErrorHandler(error, httpStatusCodes.BAD_REQUEST, reasonPhrase.BAD_REQUEST))
  }
}

export { webhook }
