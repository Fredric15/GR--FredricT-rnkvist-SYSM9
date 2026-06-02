import { Heart } from "lucide-react";
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
        to={`/products/${product._id}`}
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
          to={`/products/${product._id}`}
          className="product-card__name-link"
        >
          <h3 className="product-card__title">{product.name}</h3>
        </Link>

        <Link
          to={`/products/${product.league}`}
          className="product-card__league-link"
        >
          <p className="product-card__league">{product.league}</p>
        </Link>
        <div className="product-card__action-row">
          <span className="product-card__price">{product.price} SEK</span>

          <button
            className="add-to-cart-btn add-to-cart-btn--color-primary"
            onClick={() => addToCart(product)}
          >
            LÄGG I VARUKORG
          </button>
        </div>
      </div>
    </div>
  );
}
