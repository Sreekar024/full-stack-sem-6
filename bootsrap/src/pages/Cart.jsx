import React, { useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SkillsContext } from '../context/SkillsContext';
import { removeFromCart, updateCartQuantity, clearCart } from '../redux/slices/skillsSlice';
import BasicNavbar from '../components/navbar';
import { Link } from 'react-router-dom';
import './cart-modern.css';

function Cart() {
  const { state } = useContext(SkillsContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.skills.cart);

  // useMemo: Calculate cart totals
  const cartSummary = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      itemCount
    };
  }, [cartItems]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartQuantity({ id: productId, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  return (
    <div className={`cart-container ${state.theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <BasicNavbar />

      {/* Header Section */}
      <section className="cart-header">
        <div className="container">
          <h1>Your Learning Cart</h1>
          <p>Manage your selected courses</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="cart-content">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Start adding courses to begin your learning journey</p>
              <Link to="/" className="cta-btn">Browse Courses</Link>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Cart Items */}
              <div className="cart-items">
                <div className="items-header">
                  <h2>Cart Items <span className="badge">{cartSummary.itemCount}</span></h2>
                  <button className="clear-btn" onClick={handleClearCart}>Clear Cart</button>
                </div>

                <div className="items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-icon">{item.emoji}</div>
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <span className="item-price">${item.price.toFixed(2)}</span>
                      </div>
                      <div className="item-quantity">
                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="qty-btn">−</button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          className="qty-input"
                        />
                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="qty-btn">+</button>
                      </div>
                      <div className="item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(item.id)}
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="order-summary glass-effect">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartSummary.subtotal}</span>
                </div>
                
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>${cartSummary.tax}</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">
                  <span>Total</span>
                  <span>${cartSummary.total}</span>
                </div>

                <button className="checkout-btn">Proceed to Checkout</button>
                <Link to="/" className="continue-btn">Continue Shopping</Link>

                <div className="summary-info">
                  <div className="info-item">
                    <span className="icon">🎁</span>
                    <span>Free shipping over $100</span>
                  </div>
                  <div className="info-item">
                    <span className="icon">�</span>
                    <span>Secure checkout</span>
                  </div>
                  <div className="info-item">
                    <span className="icon">↩️</span>
                    <span>7-day money back</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Cart;
