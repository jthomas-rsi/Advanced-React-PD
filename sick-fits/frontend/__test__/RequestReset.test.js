import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import RequestReset, {
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset';

const email = 'james@isAwesome.com';
const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email },
    },
    result: {
      data: { sendUserPasswordResetLink: null },
    },
  },
];

const TestComponent = () => (
  <MockedProvider mocks={mocks}>
    <RequestReset />
  </MockedProvider>
);

describe('RequestReset Testing suite ', () => {
  it('Component renders and matches a snapshot', () => {
    const { container } = render(TestComponent());
    expect(container).toMatchSnapshot();
  });
  it('Component calls mutation when rendered ', async () => {
    render(TestComponent());
    userEvent.type(screen.getByPlaceholderText(/your email address/i), email);
    userEvent.click(screen.getByRole('button', { name: /reset password/i }));
    const successMessage = await screen.findByText(/success/i);
    expect(successMessage).toBeInTheDocument();
  });
});
