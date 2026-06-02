import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getMyOrders } from "../api.js";
import CheckoutItemsList from "../components/CheckoutItemsList.jsx";
import "./ProfilePage.css";
import { LogOut, Package } from "lucide-react";

export default function ProfilePage() {
  const { isAuth, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hämta ordrar när sidan laddas, om inte inloggad skicka till login
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError("Kunde inte hämta din orderhistorik.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuth, navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/"); // Skicka tillbaka till startsidan efter utloggning
  };

  if (loading) {
    return <div className="profile-page__loading">Hämtar din profil...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-page__header">
        <h1>Mina Sidor</h1>
        <button onClick={handleLogout} className="profile-page__logout-btn">
          <LogOut size={18} />
          Logga ut
        </button>
      </div>

      <div className="profile-page__content">
        <h2>
          <Package size={24} className="icon-align" /> Min Orderhistorik
        </h2>

        {error && <div className="error-message">{error}</div>}

        {orders.length === 0 && !error ? (
          <div className="profile-page__empty">
            <p>Du har inte gjort några beställningar ännu.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-card__header">
                  <div>
                    <span className="order-card__date">
                      {new Date(order.createdAt).toLocaleDateString("sv-SE")}
                    </span>
                    <span className="order-card__id">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </span>
                  </div>
                  <div className="order-card__total">
                    Totalt: {order.totalPrice} kr
                  </div>
                </div>

                {/* Listar ut orderartiklarna i varje order */}
                <div className="order-card__body">
                  <CheckoutItemsList items={order.orderItems} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
