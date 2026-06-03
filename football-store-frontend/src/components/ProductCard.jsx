import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext.jsx";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isAuth } = useAuth();
  const { toggleFavorite, checkIsFavorite } = useFavorites();
  const navigate = useNavigate();

  const leagueSlug = product.league
    ? product.league.toLowerCase().replace(/\s+/g, "-")
    : "okand-liga";
  const teamSlug = product.team
    ? product.team.toLowerCase().replace(/\s+/g, "-")
    : "okant-lag";

  // State för att hålla koll på om produkten är favorit eller inte
  const isFavorite = checkIsFavorite(product._id);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();

    //Om användaren inte är inloggasd, skicka till login-sidan
    if (!isAuth) {
      alert("Du måste vara inloggad för att lägga till favoriter!");
      navigate("/login");
      return;
    }

    toggleFavorite(product); // Uppdatera favoritstatus i kontexten
  };

  return (
    <div className="product-card">
      <button
        className="product-card__favorite-btn"
        title="Lägg till favoriter"
        onClick={handleFavoriteClick}
      >
        <Heart
          size={24}
          strokeWidth={1.5}
          className={`product-card__heart-icon ${isFavorite ? "product-card__heart-icon--active" : ""}`}
        />
      </button>
      <Link
        to={`/products/${leagueSlug}/${teamSlug}/${product._id}`}
        className="product-card__image-link"
      >
        <div className="product-card__image-wrapper">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-card__image"
          />
        </div>
      </Link>

      <div className="product-card__info">
        <Link
          to={`/products/${leagueSlug}/${teamSlug}/${product._id}`}
          className="product-card__name-link"
        >
          <h3 className="product-card__title">{product.name}</h3>
        </Link>

        <Link
          to={`/products/${leagueSlug}`}
          className="product-card__league-link"
        >
          <p className="product-card__league">{product.league}</p>
        </Link>
        <div className="product-card__action-row">
          <span className="product-card__price">{product.price} Kr</span>

          <button
            className="add-to-cart-btn add-to-cart-btn--color-primary"
            onClick={() => addToCart(product)}
            aria-label={`Lägg ${product.name} i korgen`}
          >
            Lägg till <ShoppingCart size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
