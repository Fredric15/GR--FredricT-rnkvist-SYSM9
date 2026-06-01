import React from "react";
import { useCart } from "../contexts/CartContext.jsx";
import { Link } from "react-router-dom";
import { Trash2, Heart, Plus, Minus } from "lucide-react";
import ProgressBar from "../components/ProgressBar.jsx";
import CartItem from "../components/CartItem.jsx";
import CartSummary from "../components/CartSummary.jsx";
import "./CartPage.css";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();



  if (cartItems.length === 0) {
    return (
      <div className="cart-page cart-page--empty">
        <h2>Din varukorg är tom</h2>
        <p>Hitta din nästa favorittröja i butiken!</p>
        <Link to="/products" className="cart-page__btn cart-page__btn--primary">
          Börja shoppa
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <ProgressBar currentStep={1} />

      <h1 className="cart-page__title">
        Din Varukorg{" "}
        <span>
          ({cartItems.length} produkt{cartItems.length > 1 ? "er" : ""})
        </span>
      </h1>

      <div className="cart-page__content">
        <div className="cart-page__items">
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>

        <div className="cart-page__summary-wrapper">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
