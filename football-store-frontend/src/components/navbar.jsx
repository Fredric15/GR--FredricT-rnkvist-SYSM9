import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useCart } from "../contexts/CartContext.jsx";

export default function Navbar() {
  const { isAuth, logoutUser } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">Football Store</Link>
      </div>
      <nav className="header-nav">
        <Link to="/league/allsvenskan" className="nav-link">
          Allsvenskan
        </Link>
        <Link to="/league/premier-league" className="nav-link">
          Premier League
        </Link>
        <Link to="/league/la-liga" className="nav-link">
          La Liga
        </Link>
        <Link to="/league/serie-a" className="nav-link">
          Serie A
        </Link>
      </nav>

      <div className="header-actions">
        <div className="search-section">
          <input type="text" placeholder="Sök..." className="search-input" />
          <button className="search-btn">Sök</button>
        </div>
        <div className="auth-section">
          {/* Visa text beroende på om användaren är inloggad eller inte */}
          {isAuth ? (
            <button onClick={logoutUser} className="auth-btn">
              Logga ut
            </button>
          ) : (
            <Link to="/login" className="auth-link">
              Logga in
            </Link>
          )}
          {/* Varukorgen */}
          <Link to="/cart" className="cart-section">
            <span className="cart-icon">🛒</span>

            {/* Visa bara den röda lilla siffran om det faktiskt finns något i korgen */}
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
