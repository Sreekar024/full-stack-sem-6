import React, { useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/skillsSlice';
import { SkillsContext } from '../context/SkillsContext';
import BasicNavbar from "../components/navbar";
import './home-modern.css';

function Home() {
  const { state } = useContext(SkillsContext);
  const dispatch = useDispatch();
  const products = useSelector(state => state.skills.products);
  const cartItems = useSelector(state => state.skills.cart);

  // useMemo: Calculate featured products and cart count
  const productsData = useMemo(() => {
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const featured = products.slice(0, 6);
    return { featured, cartCount };
  }, [products, cartItems]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  return (
    <div className={`home-container ${state.theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <BasicNavbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Discover Premium <span className="gradient-text">Courses</span></h1>
            <p className="hero-subtitle">Elevate your skills with our curated collection of professional development courses</p>
            <a href="#products" className="cta-button">Explore Courses</a>
          </div>
          <div className="hero-visual">
            <div className="floating-card card1">💻</div>
            <div className="floating-card card2">📱</div>
            <div className="floating-card card3">🎨</div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products-section">
        <div className="section-header">
          <h2>Featured Collection</h2>
          <p>Hand-picked courses for your growth</p>
        </div>

        <div className="products-grid">
          {productsData.featured.map((product) => (
            <div key={product.id} className="product-card glass-effect">
              <div className="product-icon">{product.emoji}</div>
              <div className="product-category">{product.category}</div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <div className="price-section">
                  <span className="price-label">Price</span>
                  <span className="price-value">${product.price}</span>
                </div>
                <button
                  className={`add-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
                  onClick={() => handleAddToCart(product)}
                >
                  {isInCart(product.id) ? '✓ Added' : '+ Add'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-header">
          <h2>Why Choose Our Courses</h2>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">�</div>
            <h4>Industry Experts</h4>
            <p>Learn from professionals with 10+ years of experience</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">�</div>
            <h4>Career Growth</h4>
            <p>Advance your career with in-demand skills</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">�</div>
            <h4>Certifications</h4>
            <p>Earn recognized certificates upon completion</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌍</div>
            <h4>Global Access</h4>
            <p>Learn anytime, anywhere at your own pace</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="gradient-bg py-5 text-white mt-5">
        <div className="container">
          <div className="row g-4 mb-5">
            <div className="col-md-3">
              <h5>ShopHub</h5>
              <p className="small">Modern E-Commerce with Advanced State Management</p>
            </div>
            <div className="col-md-3">
              <h6>Quick Links</h6>
              <ul className="list-unstyled small">
                <li><a href="/" className="text-white-50 text-decoration-none">Home</a></li>
                <li><a href="/portfolio" className="text-white-50 text-decoration-none">Projects</a></li>
                <li><a href="/cart" className="text-white-50 text-decoration-none">Cart</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6>Contact</h6>
              <p className="small">Email: info@experiment5.com</p>
              <p className="small">Phone: +1 234 567 8900</p>
            </div>
            <div className="col-md-3">
              <h6>Newsletter</h6>
              <p className="small">Subscribe for updates and exclusive offers</p>
            </div>
          </div>
          <hr className="bg-white-50" />
          <p className="text-center small text-white-50">© 2026 ShopHub. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;