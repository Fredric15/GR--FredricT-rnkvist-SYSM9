import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../api.js";
import { useCart } from "../contexts/CartContext.jsx";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const { leagueName, teamName, productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        console.error("Kunde inte hämta produkt:", err);
        setErrorMessage("Kunde inte hämta produkt. Försök igen senare.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading)
    return (
      <div className="page-container">
        <p>Laddar produkt...</p>
      </div>
    );

  if (errorMessage)
    return (
      <div className="page-container">
        <p className="error-message">{errorMessage}</p>
      </div>
    );

  if (!product)
    return (
      <div className="page-container">
        <p>Produkt hittades inte.</p>
      </div>
    );

  return (
    <div className="page-container product-detail-page">
      <Link to={`/products/${leagueName}/${teamName}`} className="back-link">
        ← Tillbaka till produkter
      </Link>

      <div className="product-detail__container">
        <div className="product-detail__image-container">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-detail__image"
          />
        </div>

        <div className="product-detail__info">
          <h1 className="product-detail__name">{product.name}</h1>
          <Link
            to={`/products/${leagueName}`}
            className="product-detail__league-link"
          >
            {product.league}
          </Link>

          <div className="product-detail__description">
            <h3>Produktbeskrivning</h3>
            <p>
              {product.description
                ? product.description
                : "Ingen beskrivning tillgänglig."}
            </p>
          </div>

          <div className="product-detail__bottom-row">
            <p className="product-detail__price">{product.price} Kr</p>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Lägg i kundvagn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
