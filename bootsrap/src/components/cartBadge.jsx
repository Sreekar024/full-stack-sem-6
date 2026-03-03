import React from 'react';
import { useSelector } from 'react-redux';

function CartBadge() {
  const cartItems = useSelector(state => state.skills.cart);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCount === 0) return null;

  return (
    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      {cartCount}
      <span className="visually-hidden">items in cart</span>
    </span>
  );
}

export default CartBadge;
