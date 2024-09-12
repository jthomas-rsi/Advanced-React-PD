// testing suite for the SingleProduct component

import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SingleProduct, {
  SINGLE_PRODUCT_QUERY,
} from '../components/SingleProduct';

import { fakeItem } from '../lib/testUtils';

const mockProduct = fakeItem();

const mockProducts = [
  {
    // when someone makes a request with this query and variable combo
    request: {
      query: SINGLE_PRODUCT_QUERY,
      variables: { id: '123' },
    },
    // return this data
    result: {
      data: {
        Product: mockProduct,
      },
    },
  },
];

const errorMock = [
  {
    request: {
      query: SINGLE_PRODUCT_QUERY,
      variables: { id: '123' },
    },
    result: {
      errors: [
        {
          message: 'Item not found!',
        },
      ],
    },
  },
];

const TestComponent = (mockArgs) => (
  <MockedProvider mocks={mockArgs}>
    <SingleProduct id="123" />
  </MockedProvider>
);
describe('SingleProduct component', () => {
  it('renders with proper data', async () => {
    render(TestComponent(mockProducts));
    // Wait for the component to finish loading then test for testId
    const singleProduct = await screen.findByTestId('singleProduct');
    expect(singleProduct).toMatchSnapshot();
    expect(singleProduct).toBeInTheDocument();
  });

  // test the error state of the component
  it('renders with error', async () => {
    render(TestComponent(errorMock));

    const error = await screen.findByTestId('graphql-error');
    expect(error).toBeInTheDocument();
  });
});
