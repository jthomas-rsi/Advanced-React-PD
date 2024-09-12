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

  // snapshot test
  it('renders and matches the snapshot ', () => {
    const { container } = render(TestComponent());
    expect(container).toMatchSnapshot();
  });

  // alt text test - using query selector
  it('renders with correct alt text ', () => {
    const { container } = render(TestComponent());
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('alt', mockProduct.name);
  });

  // image alt text test - using getByAltText
  it('renders with correct alt text ', () => {
    render(TestComponent());
    const img = screen.getByAltText(mockProduct.name);
    expect(img).toBeInTheDocument();
  });
});
