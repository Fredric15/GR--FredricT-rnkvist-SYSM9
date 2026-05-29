import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useCart } from "../contexts/CartContext.jsx";
import { ShoppingCart, User, UserCheckIcon, Search } from "lucide-react";

export default function Navbar() {
  const { isAuth, logoutUser } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">Football Store</Link>
      </div>
      <nav className="header-nav">
        <Link to="/products/allsvenskan" className="nav-link">
          Allsvenskan
        </Link>
        <Link to="/products/premier-league" className="nav-link">
          Premier League
        </Link>
        <Link to="/products/la-liga" className="nav-link">
          La Liga
        </Link>
        <Link to="/products/serie-a" className="nav-link">
          Serie A
        </Link>
      </nav>

      <div className="header-actions">
        <div className="search-section">
          <input type="text" placeholder="Sök..." className="search-input" />
          <button className="search-btn">
            <Search className="search-icon" />
          </button>
        </div>
        <div className="auth-section">
          {isAuth ? (
            <button onClick={logoutUser} className="auth-btn">
              <UserCheckIcon className="auth-icon" />
            </button>
          ) : (
            <Link to="/login" className="auth-link">
              <User className="auth-icon" />
            </Link>
          )}
          {/* Varukorgen */}
          <Link to="/cart" className="cart-section">
            <ShoppingCart className="cart-icon" />

            {/* Visa bara den röda lilla siffran om det faktiskt finns något i korgen */}
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
