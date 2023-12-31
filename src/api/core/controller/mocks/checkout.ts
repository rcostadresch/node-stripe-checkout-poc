const CHECKOUT_SESSION_COMPLETED_BODY = {
  id: 'evt_1O1up1Prx2Pbzieihgm1beX0',
  object: 'event',
  account: 'acct_1O0q14Prx2Pbziei',
  api_version: '2023-08-16',
  created: 1697478199,
  data: {
    object: {
      id: 'cs_test_a1hIrfRo0LT10eyxKfMvIZaKPGFrSdTRQqnsZjJ5SWyIAFPZGxOCCw2Dj0',
      object: 'checkout.session',
      after_expiration: null,
      allow_promotion_codes: false,
      amount_subtotal: 2500,
      amount_total: 2500,
      automatic_tax: { enabled: false, status: null },
      billing_address_collection: 'auto',
      cancel_url: 'https://stripe.com',
      client_reference_id: 'efeb1493-c157-44eb-a87c-97b538bcbc32', // SHOULD BE APP USER ID
      consent: null,
      consent_collection: null,
      created: 1697478183,
      currency: 'usd',
      currency_conversion: null,
      custom_fields: [],
      custom_text: { shipping_address: null, submit: null, terms_of_service_acceptance: null },
      customer: null,
      customer_creation: 'if_required',
      customer_details: {
        address: { city: null, country: 'BR', line1: null, line2: null, postal_code: null, state: null },
        email: 'samantadresch@gmail.com',
        name: 'Testing Credit Card',
        phone: null,
        tax_exempt: 'none',
        tax_ids: [],
      },
      customer_email: null,
      expires_at: 1697564583,
      invoice: null,
      invoice_creation: {
        enabled: false,
        invoice_data: {
          account_tax_ids: null,
          custom_fields: null,
          description: null,
          footer: null,
          metadata: {},
          rendering_options: null,
        },
      },
      livemode: false,
      locale: 'auto',
      metadata: {},
      mode: 'payment',
      payment_intent: 'pi_3O1uozPrx2Pbziei04cyx9yl',
      payment_link: 'plink_1O1rx3Prx2PbzieiDmOl4x1d',
      payment_method_collection: 'if_required',
      payment_method_configuration_details: null,
      payment_method_options: {},
      payment_method_types: ['card'],
      payment_status: 'paid',
      phone_number_collection: { enabled: false },
      recovered_from: null,
      setup_intent: null,
      shipping_address_collection: null,
      shipping_cost: null,
      shipping_details: null,
      shipping_options: [],
      status: 'complete',
      submit_type: 'auto',
      subscription: null,
      success_url: 'https://stripe.com',
      total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
      url: null,
    },
  },
  livemode: false,
  pending_webhooks: 1,
  request: { id: null, idempotency_key: null },
  type: 'checkout.session.completed',
}
