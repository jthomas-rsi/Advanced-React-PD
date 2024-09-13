import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {
  // form controls and state
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    email: '',
  });

  // mutation hook
  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  // handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup().catch((error) => console.error(error));
    console.log(res);
    console.log({ data, loading, error });
    resetForm();
    // send the email and password to the graphqlAPI
  };

  return (
    <Form method="POST" onSubmit={(e) => handleSubmit(e)}>
      <h2>Request A Password Reset</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success - Check your email for a link to reset your password. </p>
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
        <button type="submit" onClick={() => {}}>
          Reset Password
        </button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
