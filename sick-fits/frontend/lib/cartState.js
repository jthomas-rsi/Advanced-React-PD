// This is our cart context state. We will keep all of our cart state and functionality in this file.
// We will also create a custom hook to access the cart state and functionality from any component in our app.

import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

// This is our own custom provider. Storing cart data (state) and functionality (updaters)
const CartStateProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // helper functions to update cart state
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const closeCart = () => setIsCartOpen(false);

  const openCart = () => setIsCartOpen(true);

  return (
    <LocalStateProvider
      value={{
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        closeCart,
        openCart,
      }}
    >
      {children}
    </LocalStateProvider>
  );
};

CartStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// custom hook for accessing the cart local state
const useCart = () => {
  const cart = useContext(LocalStateContext);
  return cart;
};

export { CartStateProvider, useCart };
