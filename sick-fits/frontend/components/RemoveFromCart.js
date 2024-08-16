import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import gql from 'graphql-tag';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

// this function will update the cache when an item is removed from the cart
// it will remove the item from the cache
// this will prevent us having to refetch the cart data
const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCartItem));
};

const RemoveFromCart = ({ id }) => {
  console.log({ id });
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
  });

  return (
    <BigButton
      disabled={loading}
      type="button"
      title="Remove this item from cart"
      onClick={removeFromCart}
    >
      &times;
    </BigButton>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
