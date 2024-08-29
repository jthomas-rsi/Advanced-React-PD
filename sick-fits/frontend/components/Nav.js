import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import SignOut from './SignOut';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';

const Nav = () => {
  const user = useUser();
  const { toggleCart } = useCart();

  const totalItems = user?.cart.reduce(
    (tally, cartItem) => tally + cartItem.quantity,
    0
  );

  // console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY); // variable showing as undefined in console

  return (
    <NavStyles>
      {process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
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
