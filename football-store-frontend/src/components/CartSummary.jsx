import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import "./CartSummary.css";

export default function CartSummary() {
  const { getOrderSummary } = useCart();
  const location = useLocation();

  const { total, frakt, moms, totalPrice } = getOrderSummary();

  const isCheckoutPage = location.pathname === "/checkout";

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
        <span>{totalPrice.toFixed(0)} kr</span>
      </div>

      {/* Dölj dessa knappar om vi är i kassan */}
      {!isCheckoutPage && (
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
      )}
    </div>
  );
}
