import { render, waitFor, screen } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('CartCount testing suite', () => {
  it('Component renders correctly', () => {
    render(<CartCount count={10} />);
  });

  it('Component matches snapshot', () => {
    const { container } = render(<CartCount count={41} />);
    expect(container).toMatchSnapshot();
  });

  // test if component changes when props are changed
  it('Component updates via props', async () => {
    const { container, rerender } = render(<CartCount count={26} />);
    expect(container).toHaveTextContent('26');
    rerender(<CartCount count={30} />);
    // wait 400 ms for the component to update
    await wait(400);
    expect(container).toHaveTextContent('30');
  });
  it('Component updates via props 2', async () => {
    const { container, rerender } = render(<CartCount count={26} />);
    expect(container).toHaveTextContent('26');
    rerender(<CartCount count={30} />);
    await waitFor(() => {
      expect(container).toHaveTextContent('30');
    });
  });
  it('Component updates via props 3', async () => {
    const { rerender, debug } = render(<CartCount count={26} />);
    const count1 = screen.findByText('26');
    expect(count1).toBeTruthy();
    rerender(<CartCount count={30} />);
    await wait(400);
    const count2 = screen.findByText('30');
    expect(count2).toBeTruthy();
  });
});
