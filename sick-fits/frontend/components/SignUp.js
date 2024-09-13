import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

const SignUp = () => {
  // form controls and state
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  // mutation hook
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

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
      <h2>Sign Up For An Account</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please go ahead and sign
            in!
          </p>
        )}
        <label htmlFor="name">
          Your Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
          Sign Up
        </button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
