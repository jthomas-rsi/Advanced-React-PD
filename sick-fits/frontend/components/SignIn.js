import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const SignIn = () => {
  // form controls and state
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    email: '',
    password: '',
  });

  // mutation hook
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  // handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    // send the email and password to the graphqlAPI
    await signin().then((response) => console.log(response));
  };

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="POST" onSubmit={(e) => handleSubmit(e)}>
      <h2>Sign Into Your Account</h2>
      <DisplayError error={error} />
      <fieldset>
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
          Sign In
        </button>
      </fieldset>
    </Form>
  );
};

export default SignIn;
