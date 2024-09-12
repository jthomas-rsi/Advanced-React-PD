import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { CartStateProvider } from '../lib/cartState';

// Make mocks for logged in, logged out, and logged in with cart items
const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: fakeUser() } },
  },
];

const signedInWithCartItemsMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        authenticatedItem: fakeUser({
          cart: [fakeCartItem()],
        }),
      },
    },
  },
];

const TestComponent = (mockArgs) => (
  <CartStateProvider>
    <MockedProvider mocks={mockArgs}>
      <Nav />
    </MockedProvider>
  </CartStateProvider>
);

describe('Nav testing suite', () => {
  it('Renders a minimal nav when user is signed out', () => {
    render(TestComponent(notSignedInMocks));

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent('Products');
    expect(links[0]).toHaveAttribute('href', '/products');
    expect(links[1]).toHaveTextContent('Sign In');
    expect(links[1]).toHaveAttribute('href', '/signin');
  });

  it('Renders a full nav when user is signed in', async () => {
    render(TestComponent(signedInMocks));
    await screen.findByText('Account');
    const links = screen.getAllByRole('link');
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(2);

    expect(links).toHaveLength(4);
    expect(links[0]).toHaveTextContent('Products');
    expect(links[0]).toHaveAttribute('href', '/products');
    expect(links[1]).toHaveTextContent('Sell');
    expect(links[1]).toHaveAttribute('href', '/sell');
    expect(links[2]).toHaveTextContent('Orders');
    expect(links[2]).toHaveAttribute('href', '/orders');
    expect(links[3]).toHaveTextContent('Account');
    expect(links[3]).toHaveAttribute('href', '/account');

    expect(buttons[0]).toHaveTextContent('Sign out');
    expect(buttons[1]).toHaveTextContent('My Cart');
  });
  it('Renders a full nav when user is signed in - snapshot', async () => {
    const { container } = render(TestComponent(signedInMocks));
    await screen.findByText('Account');
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('Sign out');
    expect(container).toHaveTextContent('My Cart');
  });

  it('Renders correct amount of items in the cart ', async () => {
    render(TestComponent(signedInWithCartItemsMocks));

    await screen.findByText('Account');
    const count = screen.getByText('3');
    expect(count).toBeInTheDocument();
  });
});
