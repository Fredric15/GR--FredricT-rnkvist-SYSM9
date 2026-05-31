import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Länkar (Kundtjänst) */}
        <div className="footer__section footer__section--links">
          <h4 className="footer__heading">KUNDTJÄNST</h4>
          <Link to="/faq" className="footer__link">
            Vanliga frågor (FAQ)
          </Link>
          <Link to="/terms" className="footer__link">
            Köpvillkor & Returer
          </Link>
          <Link to="/track" className="footer__link">
            Spåra min order
          </Link>
          <Link to="/contact" className="footer__link">
            Kontakta oss
          </Link>
        </div>

        {/* KOLUMN 2: Copyright & Betalningsalternativ */}
        <div className="footer__section footer__section--middle">
          <p className="footer__copyright">©2026 FOOTBALL STORE</p>

          {/* Här kan du byta ut texten mot riktiga <img>-taggar senare! */}
          <div className="footer__payments">
            <span className="footer__payment-icon" style={{ color: "#00A8EE" }}>
              Swish
            </span>
            <span className="footer__payment-icon" style={{ color: "#FF5F00" }}>
              Mastercard
            </span>
            <span className="footer__payment-icon" style={{ color: "#1A1F71" }}>
              VISA
            </span>
            <span className="footer__payment-icon" style={{ color: "#FFB3C7" }}>
              Klarna
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
