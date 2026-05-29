import { Link } from "react-router-dom";
import { getProducts } from "../api";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import UspRow from "../components/UspRow.jsx";
import heroImage from "../assets/images/rosenberg_hero.jpg";
import mainImage from "../assets/images/marchisio_main.jpg";

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
        <img src={heroImage} alt="Fotbollsspelare i aktion" className="hero-image" />
        <div className="hero-content">
          <h1>BÄR DIN PASSION</h1>
          <p>Hitta matchtröjan för ditt favoritlag idag</p>
          <Link to="/products/allsvenskan" className="hero-btn">
            Shoppa nu
          </Link>
        </div>
      </div>

      <div className="mainPage">
        
        <UspRow />

        <div className="main-image-wrapper">
          <img src={mainImage} alt="Fotbollsspelare i aktion" className="main-image" />
        </div>

        <h2 className="Section-title">POPULÄRA LIGOR OCH PRODUKTER</h2>
        {/* Produktnätet - Just nu med platshållare för att du ska kunna styla layouten */}
        <ProductGrid products={popularProducts} variant="carousel" />


        {/* Filtreringsraden / Kategorierna */}
        <div className="filterRow">
          <Link to="/products/allsvenskan" className="filter-link">
            Allsvenskan
          </Link>
          <Link to="/products/serie-a" className="filter-link">
            Serie A
          </Link>
          <Link to="/products/la-liga" className="filter-link">
            La Liga
          </Link>
          <Link to="/products/premier-league" className="filter-link">
            Premier League
          </Link>
        </div>
      </div>
    </div>
  );
}
