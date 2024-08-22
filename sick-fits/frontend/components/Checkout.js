import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import styled from 'styled-components';
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

const Checkout = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('We got to do some work...');
  };

  return (
    <Elements stripe={stripeLib}>
      <CheckoutFormStyles onSubmit={handleSubmit}>
        <CardElement />
        <SickButton>Check Out Now</SickButton>
      </CheckoutFormStyles>
    </Elements>
  );
};

export default Checkout;
