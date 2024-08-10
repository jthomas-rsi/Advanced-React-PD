import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

const Reset = ({ token }) => {
  // form controls and state
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    email: '',
    password: '',
    token,
  });

  // mutation hook
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const succesfulError = data?.redeemUserPasswordResetToken
    ? data?.redeemUserPasswordResetToken
    : undefined;

  console.log({ error });

  // handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await reset().catch(console.error);
    console.log(res);
    console.log({ data, loading, error });
    resetForm();
    // send the email and password to the graphqlAPI
  };

  return (
    <Form method="POST" onSubmit={(e) => handleSubmit(e)}>
      <h2>Reset Your Password</h2>
      <DisplayError error={error || succesfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success - You can now sign in! </p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Your email address"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="your password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit" onClick={() => {}}>
          Request Reset
        </button>
      </fieldset>
    </Form>
  );
};

Reset.propTypes = {
  token: PropTypes.string,
};

export default Reset;
