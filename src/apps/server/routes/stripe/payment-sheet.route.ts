import express from 'express';
const stripe = require('stripe')('sk_test_51QF55FDv2zRgXuBoZBcwl9El1knoH7EXKua5LTfcn6w5D1fQvszVA2Nhi5JwdTISltKZ46YlwoClSvuNgdfTQjry00BCqfsSjW');

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('Payment Sheet Route');
});

router.post('/', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2024-09-30.acacia'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'eur',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51QF55FDv2zRgXuBoFzhPTIXXPYvChuaWYjEwiJJJqgNNxEwFiqzcWdZd52Pvt3lMXdFsaUgHnDPFiaTh9jl672ey00Gdi4oOBl'
  });
});
  

export default router;