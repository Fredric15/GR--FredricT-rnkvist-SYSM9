import React from "react";
import "./CheckoutItemsList.css";

export default function CheckoutItemsList({ items }) {
if (!items || items.length === 0) {
    return (
      <div className="checkout-items-list checkout-items-list--empty">
        <p>Inga produkter i beställningen</p>
        </div>
    );
  }

    return (
      <div className="checkout-items-container">
        <h3 className="checkout-items-title">Dina varor</h3>
        <div className="checkout-items-list">
          {items.map((item) => (
            <div key={item._id} className="checkout-item">
              <img
                src={item.imageUrl || item.image}
                alt={item.name}
                className="checkout-item__img"
              />
              <div className="checkout-item__details">
                <span className="checkout-item__name">{item.name}</span>
                <span className="checkout-item__league">
                  {item.league || "Allsvenskan"}
                </span>
                <div className="checkout-item__price-row">
                  {/* Hanterar både varukorgens "quantity" och databasens "qty" */}
                  <span className="checkout-item__qty">
                    Antal: {item.quantity || item.qty || 1}st
                  </span>
                  <span className="checkout-item__price">
                    {item.price} kr/st
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    
};

