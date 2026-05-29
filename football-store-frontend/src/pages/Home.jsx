import { Link } from "react-router-dom";
import { getProducts } from "../api";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext.jsx";

export default function Home() {
  const [popularProducts, setPopularProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        setPopularProducts(allProducts.slice(0, 6)); // Visa de 6 första produkterna som "populära"
        setIsLoading(false);
      } catch (error) {
        console.error("Kunde inte hämta produkter:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <div className="heroPage">
        <div className="hero-content">
          <h1>BÄR DIN PASSION</h1>
          <p>Hitta matchtröjan för ditt favoritlag idag</p>
          <Link to="/league/allsvenskan" className="hero-btn">
            Shoppa nu
          </Link>
        </div>
      </div>
      <div className="mainPage">
        <h2 className="Section-title">POPULÄRA LIGOR OCH PRODUKTER</h2>

        {/* Filtreringsraden / Kategorierna */}
        <div className="filterRow">
          <Link to="/league/allsvenskan" className="filter-link">
            Allsvenskan
          </Link>
          <Link to="/league/serie-a" className="filter-link">
            Serie A
          </Link>
          <Link to="/league/la-liga" className="filter-link">
            La Liga
          </Link>
          <Link to="/league/premier-league" className="filter-link">
            Premier League
          </Link>
        </div>

        {/* Produktnätet - Just nu med platshållare för att du ska kunna styla layouten */}
        <div className="ProductGrid">
          {isLoading ?? <p>Laddar produkter...</p>}

          {!isLoading &&
            popularProducts.map((product) => (
              <div key={product._id} className="ProductCard">
                <div className="product-image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-league">{product.league}</p>
                  <p className="product-price">{product.price} SEK</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    Lägg i varukorg
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
