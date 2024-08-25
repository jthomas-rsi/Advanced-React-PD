import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import styled from 'styled-components';
import nProgress from 'nprogress';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

// TODO replace this string with env variable later
const stripeLib = loadStripe(
  'pk_test_51PqisKB2eOjmLVyzyTIuT37726oVl0XKvOf1S5QCBfawuQ5rzKp4XSSBGUpvWMFUs83vYaJUnbHWbJl0jBOaJRHM00gdozrwCl'
);

const CheckoutForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

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
    console.log(error);
    // 4. handle any errors from stripe
    if (error) {
      setError(error);
    }
    // 5. send the token from step 3 to our keystone server via a custom mutation

    // 6. change the page to view the order
    // 7. close the cart
    // 8. turn the loader off, set loading to false
    setLoading(false);
    nProgress.done();
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: '12px' }}>{error.message}</p>}
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
