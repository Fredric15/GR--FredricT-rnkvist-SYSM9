import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import "./CartItem.css";

export default function CartItem({ item, updateQuantity, removeFromCart }) {
  return (
    <div className="cart-item">
      <img src={item.imageUrl} alt={item.name} className="cart-item__img" />

      <div className="cart-item__details">
        <div className="cart-item__header">
          <h3 className="cart-item__title">{item.name}</h3>
          <button
            className="cart-item__icon-btn"
            onClick={() => removeFromCart(item._id)}
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="cart-item__actions">
          <div className="cart-item__quantity">
            <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
              <Minus size={16} />
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
              <Plus size={16} />
            </button>
          </div>
          <span className="cart-item__price">{item.price} SEK</span>
        </div>
      </div>
    </div>
  );
}
