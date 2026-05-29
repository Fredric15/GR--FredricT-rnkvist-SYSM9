import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-nav">
        <Link to="/kundtjanst" className="footer-link">
          KUNDTJÄNST
        </Link>
        <span className="footer-divider"> | </span>
        <Link to="/om-oss" className="footer-link">
          OM OSS
        </Link>
        <span className="footer-divider"> | </span>
        <Link to="/kontakt" className="footer-link">
          KONTAKT
        </Link>
      </div>

      <div className="footer-copyright">
        <p>©2026 FOOTBALL STORE</p>
      </div>

      <div className="footer-socials">
        <p>
          FÖLJ OSS:
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            {" "}
            [IG]{" "}
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            {" "}
            [FB]{" "}
          </a>
        </p>
      </div>
    </footer>
  );
}
