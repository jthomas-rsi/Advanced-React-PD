import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Product from '../components/Product';
import { fakeItem } from '../lib/testUtils';

const mockProduct = fakeItem();

const TestComponent = () => (
  <MockedProvider>
    <Product productData={mockProduct} />
  </MockedProvider>
);

describe('Product component ', () => {
  it('renders with correct price string', () => {
    // test using screen
    render(TestComponent());
    const h2 = screen.getByText('$235.62');
    expect(h2).toBeInTheDocument();
  });
  it('renders with link', () => {
    // test using container
    const { container } = render(TestComponent());
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/product/6695cadeb72f324aac2a7f72');
    expect(link).toHaveTextContent('KITH Hoodie');
  });
});
