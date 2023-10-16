import { NextFunction, Request, Response } from 'express'
import { User } from '@models'
import { ErrorHandler } from 'errors/ErrorHandler'
import { httpStatusCodes, reasonPhrase } from 'errors/httpStatusCodes'
import Stripe from 'stripe'

type StripeAccount = Stripe.Account & { metadata: { app_user_id: string } }

const upsertGatewayAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findOne({ where: { email: 'robersoncosta96@gmail.com' } })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' })

    if (user.gateway_account_id) {
      const account = await stripe.accounts.retrieve(user.gateway_account_id)

      if (account) {
        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          type: 'account_onboarding',
          return_url: 'https://www.google.com/', // REQUIRED FIELD
          refresh_url: 'https://www.google.com/', // REQUIRED FIELD
        })

        res.send(accountLink)
        return
      }
    } else {
      const account = (await stripe.accounts.create({
        email: user.email,
        type: 'standard',
        metadata: {
          app_user_id: user.id,
        },
      })) as unknown as StripeAccount

      // stripe.tokens.create({ account: account.id })

      user.gateway_account_id = account.id
      await user.save()

      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        type: 'account_onboarding',
        return_url: 'https://www.google.com/', // REQUIRED FIELD
        refresh_url: 'https://www.google.com/', // REQUIRED FIELD
      })

      res.send(accountLink)
    }
  } catch (error) {
    next(new ErrorHandler(error, httpStatusCodes.BAD_REQUEST, reasonPhrase.BAD_REQUEST))
  }
}

const upsertGatewayCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findOne({ where: { email: 'samantadresch@gmail.com' } })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' })

    if (user.gateway_customer_id) {
      const customer = await stripe.customers.retrieve(user.gateway_customer_id)

      if (customer) {
        return
      }
    } else {
      const customer = (await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          app_user_id: user.id,
        },
      })) as unknown as StripeAccount

      user.gateway_customer_id = customer.id
      await user.save()

      res.send(customer)
    }
  } catch (error) {
    next(new ErrorHandler(error, httpStatusCodes.BAD_REQUEST, reasonPhrase.BAD_REQUEST))
  }
}

export { upsertGatewayAccount, upsertGatewayCustomer }
