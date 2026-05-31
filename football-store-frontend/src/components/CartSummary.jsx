import React from "react";
import { Link } from "react-router-dom";
import "./CartSummary.css";

export default function CartSummary({ total, frakt, moms, slutsumma }) {
  return (
    <div className="cart-summary">
      <div className="cart-summary__row">
        <span>Delsumma</span>
        <span>{total} kr</span>
      </div>
      <div className="cart-summary__row">
        <span>Leverans</span>
        <span>{frakt === 0 ? "0 kr" : `${frakt} kr`}</span>
      </div>
      <div className="cart-summary__row">
        <span>Moms (25%)</span>
        <span>{moms.toFixed(2)} kr</span>
      </div>

      <div className="cart-summary__divider"></div>

      <div className="cart-summary__row cart-summary__row--total">
        <span>Totalt</span>
        <span>{slutsumma} kr</span>
      </div>

      <div className="cart-summary__buttons">
        <Link
          to="/products"
          className="cart-summary__btn cart-summary__btn--secondary"
        >
          Fortsätt handla
        </Link>
        <Link
          to="/checkout"
          className="cart-summary__btn cart-summary__btn--primary"
        >
          Gå vidare till kassan
        </Link>
      </div>
    </div>
  );
}
