import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar.jsx";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import CartSummary from "../components/CartSummary.jsx";
import CheckoutItemsList from "../components/CheckoutItemsList.jsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart, getOrderSummary } = useCart();
  const navigate = useNavigate();

  // State för att hålla koll på om sammanfattningen är öppen eller inte på mobil
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Orderdata:", {
      ...formData,
      paymentMethod,
      cartItems,
      totalPrice: getOrderSummary().totalPrice,
    });

    const formattedCartItems = cartItems.map((item) => ({
      name: item.name,
      qty: item.quantity || 1,
      image: item.imageUrl,
      price: item.price,
      product: item._id,
    }));

    const orderPayload = {
      email: formData.email,
      shippingAddress: {
        fullName: formData.fullName,
        address: formData.address,
        zipCode: formData.postalCode,
        city: formData.city,
        country: formData.country,
        phone: formData.phone,
      },
      orderItems: formattedCartItems,
      totalPrice: getOrderSummary().totalPrice,
      paymentMethod,
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error("Något gick fel vid orderläggningen");
      }

      const savedOrder = await response.json();
      console.log("Order sparad:", savedOrder);
      clearCart();
      navigate("/order-confirmation", { state: { orderData: savedOrder } });
    } catch (error) {
      console.error("Kunde inte skicka ordern:", error);
      alert("Ett fel uppstod när din order skulle hanteras. Försök igen!");
    }
  };

  return (
    <div className="checkout-page">
      <ProgressBar currentStep={2} />

      <h1 className="checkout-page__title">Kassa</h1>

      <div className="checkout-page__content">
        <div className="checkout-form-container">
          <div
            className="checkout-summary-toggle"
            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
          >
            <div className="checkout-summary-toggle__info">
              <h3>Din varukorg</h3>
              <span>
                {cartItems.length} produkt{cartItems.length > 1 ? "er" : ""}
              </span>
            </div>
            <div className="checkout-summary-toggle__price">
              <span>{getOrderSummary().totalPrice} kr</span>
              {isSummaryOpen ? (
                <ChevronUp size={24} />
              ) : (
                <ChevronDown size={24} />
              )}
            </div>
          </div>

          {/* KVITTOT PÅ MOBILEN (Visas bara här om isSummaryOpen är true) */}
          <div
            className={`checkout-mobile-summary ${isSummaryOpen ? "checkout-mobile-summary--open" : ""}`}
          >
            <CheckoutItemsList items={cartItems} />
            <CartSummary />
          </div>

          <h2>Leveransinformation</h2>
          <p className="checkout-form__disclaimer">
            Fält markerade med * är obligatoriska.
          </p>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-form__group">
              <label htmlFor="fullName">Fullständigt namn *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="checkout-form__group">
              <label htmlFor="email">E-post *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="checkout-form__group">
              <label htmlFor="address">Adress *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="checkout-form__group">
              <label htmlFor="city">Stad *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="checkout-form__group">
              <label htmlFor="postalCode">Postnummer *</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="checkout-form__group">
              <label htmlFor="country">Land *</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="checkout-form__group">
              <label htmlFor="phone">Telefonnummer</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="checkout-payment">
              <h3>Välj betalsätt</h3>
              <div className="checkout-payment__options">
                <div
                  className={`checkout-payment__option ${paymentMethod === "swish" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("swish")}
                >
                  <span style={{ color: "#00A8EE", fontWeight: "bold" }}>
                    Swish
                  </span>
                </div>
                <div
                  className={`checkout-payment__option ${paymentMethod === "klarna" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("klarna")}
                >
                  <span style={{ color: "#FFB3C7", fontWeight: "bold" }}>
                    Klarna
                  </span>
                </div>
                <div
                  className={`checkout-payment__option ${paymentMethod === "card" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <span style={{ color: "#1A1F71", fontWeight: "bold" }}>
                    Kort
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="checkout-submit-btn"
              disabled={!paymentMethod}
            >
              Betala{" "}
              {getOrderSummary().totalPrice > 0
                ? `- ${getOrderSummary().totalPrice.toFixed(2)} kr`
                : ""}
            </button>
          </form>
        </div>

        <div className="checkout-desktop-summary">
          <CheckoutItemsList items={cartItems} />
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
