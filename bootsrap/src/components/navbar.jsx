import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { SkillsContext } from '../context/SkillsContext';
import FavoritesWidget from './favoritesWidget';
import './navbar-modern.css';

function BasicNavbar() {
  const cartItems = useSelector(state => state.skills.cart);
  const { state } = useContext(SkillsContext);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={`modern-navbar ${state.theme === 'dark' ? 'dark' : 'light'}`}>
      <Container>
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">✨</span>
            <span className="brand-text">Prism</span>
          </Link>

          <div className="navbar-menu">
            <Link to="/" className="nav-item">Store</Link>
            <Link to="/portfolio" className="nav-item">Portfolio</Link>
            <Link to="/about" className="nav-item">About</Link>
          </div>

          <div className="navbar-actions">
            <Link to="/cart" className="nav-action cart-link">
              <span className="cart-icon">🛒</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <FavoritesWidget />
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default BasicNavbar;
