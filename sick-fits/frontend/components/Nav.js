import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import SignOut from './SignOut';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';

const Nav = () => {
  const user = useUser();
  const { toggleCart } = useCart();

  // console.log({ user });

  const totalItems = user?.cart.reduce(
    (tally, cartItem) => tally + cartItem.quantity,
    0
  );

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={toggleCart}>
            {' '}
            My Cart
            <CartCount count={totalItems} />
          </button>
        </>
      )}
      {!user && <Link href="/signin">Sign In</Link>}
    </NavStyles>
  );
};

export default Nav;
