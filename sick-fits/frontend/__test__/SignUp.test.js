import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import SignUp, { SIGNUP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const mockUser = fakeUser();
const password = 'JamesBond007';
const mocks = [
  // mock mutation
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: mockUser.email,
        name: mockUser.name,
        password,
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'abc123',
          email: mockUser.email,
          name: mockUser.name,
        },
      },
    },
  },
];

const TestComponent = () => (
  <MockedProvider mocks={mocks}>
    <SignUp />
  </MockedProvider>
);

describe('SignUp Testing suite ', () => {
  it('Component renders and matches a snapshot', () => {
    const { container } = render(TestComponent());
    expect(container).toMatchSnapshot();
  });

  it('Component calls the mutation properly', async () => {
    const { container, debug } = render(TestComponent());

    // fill in the form
    userEvent.type(screen.getByPlaceholderText(/full name/i), mockUser.name);
    userEvent.type(
      screen.getByPlaceholderText(/Your email address/i),
      mockUser.email
    );
    userEvent.type(screen.getByPlaceholderText(/your password/i), password);

    // submit the form
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // wait for the mutation to complete
    await screen.findByText(/Signed up with/i);

    // There is no need for the expect in this test because if the findByText above fails the entire test will fail
  });
});
