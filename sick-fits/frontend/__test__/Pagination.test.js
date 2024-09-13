import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { makePaginationMocksFor } from '../lib/testUtils';
import Pagination from '../components/Pagination';

const TestComponent = (itemNumber, pageNumber) => (
  <MockedProvider mocks={makePaginationMocksFor(itemNumber)}>
    <Pagination page={pageNumber} />
  </MockedProvider>
);

describe('Pagination Testing suite ', () => {
  it('Component displays a loading message', () => {
    const { container } = render(TestComponent(1, 1));

    expect(container).toContainHTML('Loading...');
  });
  it('Component renders pagination for 10 items', async () => {
    // pass the correct page to Pagination component
    // pass the number of mocked items to makePaginationMocksFor
    const { container, debug } = render(TestComponent(10, 1));

    await screen.findByTestId('paginationContainer');
    const text = screen.getByTestId('pageCountText');
    expect(text).toHaveTextContent('Page 1 of 5');
    expect(container).toMatchSnapshot();
  });
  it('Component disables prev button on first page', async () => {
    const { container, debug } = render(TestComponent(6, 1));

    await screen.findByTestId('paginationContainer');
    const prevButton = screen.getByTestId('prevPage-btn');
    const nextButton = screen.getByTestId('nextPage-btn');
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });
  it('Component disables next button on last page', async () => {
    const { container, debug } = render(TestComponent(6, 3));
    await screen.findByTestId('paginationContainer');
    const nextButton = screen.getByTestId('nextPage-btn');
    const prevButton = screen.getByTestId('prevPage-btn');
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
  });
  it('Component enables all on middle page', async () => {
    const { container, debug } = render(TestComponent(6, 2));
    await screen.findByTestId('paginationContainer');
    const nextButton = screen.getByTestId('nextPage-btn');
    const prevButton = screen.getByTestId('prevPage-btn');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
  });
});
