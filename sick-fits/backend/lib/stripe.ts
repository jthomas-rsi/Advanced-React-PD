// creating this strip configuration in a separate file to use it in multiple places
// we can utilize this configuration multiple times without having to repass the secret key
import Stripe from 'stripe';

const stripeConfig = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2020-08-27',
});

export default stripeConfig;
