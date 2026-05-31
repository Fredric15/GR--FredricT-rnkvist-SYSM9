import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useCart } from "../contexts/CartContext.jsx";
import {
  ShoppingCart,
  User,
  UserCheckIcon,
  Search,
  X,
  Menu,
} from "lucide-react";

export default function Navbar() {
  const { isAuth, logoutUser } = useAuth();
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* VÄNSTER: LOGGA */}
        <Link to="/" className="navbar__logo">
          FOOTBALL STORE
        </Link>

        {/* MITTEN PÅ DESKTOP: Länkar */}
        <ul className={`navbar__menu ${isOpen ? "navbar__menu--active" : ""}`}>
          <li className="navbar__item">
            <Link to="/products" className="navbar__link" onClick={closeMenu}>
              Alla tröjor
            </Link>
          </li>
          <li className="navbar__item">
            <Link
              to="/products/allsvenskan"
              className="navbar__link"
              onClick={closeMenu}
            >
              Allsvenskan
            </Link>
          </li>
          <li className="navbar__item">
            <Link
              to="/products/premier-league"
              className="navbar__link"
              onClick={closeMenu}
            >
              Premier League
            </Link>
          </li>
          <li className="navbar__item">
            <Link
              to="/products/serie-a"
              className="navbar__link"
              onClick={closeMenu}
            >
              Serie A
            </Link>
          </li>
          <li className="navbar__item">
            <Link
              to="/products/la-liga"
              className="navbar__link"
              onClick={closeMenu}
            >
              La Liga
            </Link>
          </li>
        </ul>

        {/* HÖGER: Utilities (Sök, Profil, Varukorg, Hamburgare) */}
        <div className="navbar__utilities">
          {/* Sök-ikon för mobil (Döljs på desktop) */}
          <button
            className="navbar__icon-btn navbar__search-mobile-btn"
            aria-label="Sök"
          >
            <Search size={24} />
          </button>

          {/* Sökfältet (Dolt på mobil) */}
          <div className="navbar__search-desktop">
            <Search size={18} className="navbar__search-icon" />
            <input
              type="text"
              placeholder="Sök..."
              className="navbar__search-input"
            />
          </div>

          {/* Profilikon */}
          <button
            className="navbar__icon-btn navbar__icon-btn--user"
            aria-label="Profil"
          >
            <User size={24} />
          </button>

          {/* Varukorg */}
          <Link
            to="/cart"
            className="navbar__link navbar__link--cart"
            onClick={closeMenu}
          >
            <ShoppingCart size={24} />
            {/* Visa siffra om det finns något i varukorgen */}
            {cartCount > 0 && (
              <span className="navbar__cart-badge">{cartCount}</span>
            )}
          </Link>

          {/* Hamburger-meny (Döljs på desktop) */}
          <button
            className="navbar__toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
