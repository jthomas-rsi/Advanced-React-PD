import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';

import CreateProduct, {
  CREATE_PRODUCT_MUTATION,
} from '../components/CreateProduct';
import { ALL_PRODUCTS_QUERY } from '../components/Products';
import { fakeItem, makePaginationMocksFor } from '../lib/testUtils';

// create a fake item to test the form
const fakeProduct = fakeItem();

// create a mock object for the createProduct mutation
const mocks = [
  {
    request: {
      query: CREATE_PRODUCT_MUTATION,
      variables: {
        name: fakeProduct.name,
        price: fakeProduct.price,
        description: fakeProduct.description,
        image: '',
      },
    },
    result: {
      data: {
        createProduct: {
          ...fakeProduct, // spread in the fakeProduct object
          id: 'abc123',
          __typename: 'Item',
        },
      },
    },
  },
  {
    request: {
      query: ALL_PRODUCTS_QUERY,
      variables: { first: 2, skip: 0 },
    },
    result: {
      data: {
        allProducts: [fakeProduct],
      },
    },
  },
];

// mock router object with push method
jest.mock('next/router', () => ({
  push: jest.fn(),
}));

// create reusable TestComponent wrapper
const TestComponent = (mockParams) => (
  <MockedProvider mocks={mockParams ?? []}>
    <CreateProduct />
  </MockedProvider>
);

describe('CreateProduct Testing suite ', () => {
  it('Component renders and matches a snapshot', () => {
    const { container } = render(TestComponent());
    expect(container).toMatchSnapshot();
  });
  it('Component renders form and handles value changes', async () => {
    // 1. render out the form
    render(TestComponent());
    // 2. type into the input elements name, price, and description
    const nameInput = screen.getByPlaceholderText(/name/i);
    const priceInput = screen.getByPlaceholderText(/price/i);
    const descriptionInput = screen.getByPlaceholderText(/description/i);

    await userEvent.type(nameInput, fakeProduct.name);
    await userEvent.type(priceInput, fakeProduct.price.toString());
    await userEvent.type(descriptionInput, fakeProduct.description);
    // 3. check if the inputs have been filled out properly
    expect(screen.getByDisplayValue(fakeProduct.name)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(fakeProduct.price.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(fakeProduct.description)
    ).toBeInTheDocument();
  });

  it('Component creates items when the form is submitted', async () => {
    // render the form with the mock object
    render(TestComponent(mocks));

    // type into the input elements name, price, and description
    const nameInput = screen.getByPlaceholderText(/name/i);
    const priceInput = screen.getByPlaceholderText(/price/i);
    const descriptionInput = screen.getByPlaceholderText(/description/i);

    await userEvent.type(nameInput, fakeProduct.name);
    await userEvent.type(priceInput, fakeProduct.price.toString());
    await userEvent.type(descriptionInput, fakeProduct.description);

    // submit the form
    userEvent.click(screen.getByRole('button', { name: /add product/i }));

    waitFor(() => {
      expect(Router.push).toHaveBeenCalled();
      expect(Router.push).toHaveBeenCalledWith({
        pathname: `/product/${mocks[0].result.data.createProduct.id}`,
      });
    });
  });
});
