import { Link } from "react-router-dom";
import { getProducts } from "../api";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import UspRow from "../components/UspRow.jsx";
import heroImage from "../assets/images/rosenberg_hero.jpg";
import mainImage from "../assets/images/marchisio_main.jpg";
import "./Home.css";

export default function Home() {
  const [popularProducts, setPopularProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  const scrollToProducts = (e) => {
    e.preventDefault();
    const section = document.querySelector(".home__showcase");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
    <div className="home">
      <section className="hero">
        <img
          src={heroImage}
          alt="Fotbollsspelare i aktion"
          className="hero__image"
        />
        <div className="hero__content">
          <h1 className="hero__title">BÄR DIN PASSION</h1>
          <p className="hero__text">Hitta matchtröjan för ditt favoritlag</p>
          <button
            href="#popular-products"
            className="hero__btn"
            onClick={scrollToProducts}
          >
            Populära produkter
          </button>
        </div>
      </section>

      <div className="home__main">
        <UspRow className="home__usp-row" />

        <div className="home__showcase" id="popular-products">
          <div className="home__showcase-left">
            <img
              src={mainImage}
              alt="Fotbollsspelare i aktion"
              className="home__showcase-image"
            />
          </div>
          <div className="home__showcase-right">
            <h2 className="home__section-title">POPULÄRA PRODUKTER</h2>

            {/* Produktnätet - Just nu med platshållare för att du ska kunna styla layouten */}
            {isLoading ? (
              <p>Laddar produkter...</p>
            ) : (
              <ProductGrid products={popularProducts} variant="carousel" />
            )}
          </div>
        </div>

        {/* Filtreringsraden / Kategorierna */}
        <div className="home__categories-row">
          <Link to="/products" className="home__filter-link">
            Alla produkter
          </Link>
          <Link to="/products/allsvenskan" className="home__filter-link">
            Allsvenskan
          </Link>
          <Link to="/products/serie-a" className="home__filter-link">
            Serie A
          </Link>
          <Link to="/products/la-liga" className="home__filter-link">
            La Liga
          </Link>
          <Link to="/products/premier-league" className="home__filter-link">
            Premier League
          </Link>
        </div>
      </div>
    </div>
  );
}
