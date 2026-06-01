import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar.jsx';
// import './OrderConfirmationPage.css';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const orderData = location.state?.orderData;


  if (!orderData) {
    return (
      <div className="order-confirmation order-confirmation--error">
        <h2>Hoppsan!</h2>
        <p>Vi kunde inte hitta din order. Har du redan slutfört ditt köp?</p>
        <Link
          to="/"
          className="order-confirmation__btn order-confirmation__btn--primary"
        >
          Tillbaka till butiken
        </Link>
      </div>
    );
  }

  const totalQuantity = orderData.orderItems.reduce((total, item) => total + (item.quantity || item.qty || 1), 0);
  const frakt = orderData.delsumma > 899 ? 0 : 49;
  const moms = orderData.delsumma * 0.25;
  const delsumma = orderData.totalPrice - frakt - moms;

  return (
    <div className="order-confirmation">
      <ProgressBar currentStep={3} />


      <div className="order-confirmation__card">
        <div className="order-confirmation__header">
          <span className="order-confirmation__icon">🎉</span>

          <h1 className="order-confirmation__title-mobile">
            Tack för din beställning!
          </h1>

          <h1 className="order-confirmation__title-desktop">
            Din order har mottagits!
          </h1>
          <p className="order-confirmation__order-nr">
            Ordernummer: #{orderData._id.slice(-6).toUpperCase()}
          </p>

          <div className="order-confirmation__customer-type">
            {orderData.user ? (
              <span className="badge badge--member">✓ Inloggad Medlem</span>
            ) : (
              <span className="badge badge--guest">Gästbeställning</span>
            )}
          </div>

          <p className="order-confirmation__delivery-info">
            Dina varor skickas inom 1-2 arbetsdagar.
          </p>
        </div>
        
        {/* PRODUKTERNA */}
        <div className="order-confirmation__items-container">
          <h3 className="order-confirmation__items-title">
            {totalQuantity} produkt{totalQuantity > 1 ? "er" : ""}
          </h3>

          <div className="order-confirmation__items">
            {orderData.orderItems.map((item) => (
              <div key={item._id} className="order-item">
                <img
                  src={item.imageUrl || item.image}
                  alt={item.name}
                  className="order-item__img"
                />
                <div className="order-item__details">
                  <span className="order-item__name">{item.name}</span>
                  <span className="order-item__league">
                    {item.league || "Allsvenskan"}
                  </span>
                  <div className="order-item__price-row">
                    <span className="order-item__qty">
                      Antal: {item.quantity || item.qty || 1}st
                    </span>
                    <span className="order-item__price">
                      {item.price} kr/st
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KVITTOT */}
        <div className="order-confirmation__summary">
          <div className="order-summary__row">
            <span>Delsumma</span>
            <span>{Math.round(delsumma + moms)} kr</span>
          </div>
          <div className="order-summary__row">
            <span>Leverans</span>
            <span>{frakt === 0 ? "0 kr" : `${frakt} kr`}</span>
          </div>
          <div className="order-summary__row">
            <span>Moms</span>
            <span>{moms.toFixed(2)} kr</span>
          </div>

          <div className="order-summary__divider"></div>

          <div className="order-summary__row order-summary__row--total">
            <span>Totalt</span>
            <span>{orderData.totalPrice.toFixed(2)} kr</span>
          </div>
        </div>
      </div>

      {/* Fortsätt handla-knappen hamnar utanför kortet, centrerad i botten! */}
      <Link to="/products" className="order-confirmation__continue-btn">
        Fortsätt handla
      </Link>
    </div>
  );
}