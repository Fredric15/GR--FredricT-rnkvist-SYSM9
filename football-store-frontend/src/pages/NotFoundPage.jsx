import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <AlertCircle size={64} className="not-found__icon" />
        <h1 className="not-found__title">404 - Sidan hittades inte</h1>
        <p className="not-found__text">
          Tyvärr, sidan du letar efter finns inte.
        </p>
        <Link to="/" className="not-found__btn">
          Gå tillbaka till startsidan
        </Link>
      </div>
    </div>
  );
}
