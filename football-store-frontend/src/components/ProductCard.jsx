import { Heart } from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <button className="favorite-btn" title="Lägg till favoriter">
        <Heart size={24} strokeWidth={1.5} />
      </button>
      <Link to={`/products/${product._id}`} className="product-image-link">
        <div className="product-image-wrapper">
          <img src={product.imageUrl} alt={product.name} />
        </div>
      </Link>

      <div className="product-info">
        <Link to={`/products/${product._id}`} className="product-name-link">
          <h3>{product.name}</h3>
        </Link>

        <Link to={`/products/${product.league}`} className="product-league-link">
          <p className="product-league">{product.league}</p>
        </Link>
        <div className="product-action-row">
          <span className="product-price">{product.price} SEK</span>

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
