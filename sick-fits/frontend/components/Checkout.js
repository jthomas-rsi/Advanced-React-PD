import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import styled from 'styled-components';
import nProgress from 'nprogress';
import gql from 'graphql-tag';
import { useCart } from '../lib/cartState';
import SickButton from './styles/SickButton';
import CURRENT_USER_QUERY from './User';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

// TODO replace this string with env variable later
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
const stripeLib = loadStripe(stripeKey);

const CheckoutForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { closeCart } = useCart();
  const [checkout, { error: graphqlError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const handleSubmit = async (e) => {
    // 1. stop form from submitting and turn the loader on
    e.preventDefault();
    console.log('We got to do some work...');
    setLoading(true);
    // 2. start the page transition and say "loading"
    nProgress.start();
    // 3. create the payment method via stripe (token comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement), // get the card element from the stripe element
    });
    console.log({ paymentMethod });
    // console.log(error);
    // 4. handle any errors from stripe
    if (error) {
      setError(error);
      nProgress.done(); // turn off the progress bar
      return; // stop the checkout flow because there is an error
    }
    // 5. send the token from step 3 to our keystone server via a custom mutation
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });

    console.log('Finished with the order!!');
    // 6. change the page to view the order
    console.log({ order });
    router.push({
      pathname: `/order/[id]`,
      query: { id: order.data.checkout.id },
    });
    // 7. close the cart
    closeCart();
    // 8. turn the loader off, set loading to false
    setLoading(false);
    nProgress.done();
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: '12px' }}>{error.message}</p>}
      {graphqlError && (
        <p style={{ fontSize: '12px' }}>{graphqlError.message}</p>
      )}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
};

const Checkout = () => (
  <Elements stripe={stripeLib}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
