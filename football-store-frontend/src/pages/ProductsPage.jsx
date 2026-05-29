import React, { useState, useEffect } from "react";
import { getProducts } from "../api";
import { useCart } from "../contexts/CartContext.jsx";
import { Link, useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import { SlidersHorizontal } from "lucide-react";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { leagueName, teamName } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        setAllProducts(data);
      } catch (error) {
        console.error("Kunde inte hämta produkter:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 1. Filtrera först ut alla produkter som tillhör den valda ligan
  const leagueProducts = leagueName
    ? allProducts.filter((product) => {
        // Skapa en slug av databasens värde: "Premier League" blir "premier-league"
        const dbSlug = product.league.toLowerCase().replace(/\s+/g, "-");

        // Jämför den nyskapade sluggen med URL:ens leagueName
        return dbSlug === leagueName.toLowerCase();
      })
    : allProducts;

  // 2. Skapa en unik lista med alla lag som finns i den aktuella ligan (för menyn)
  // Vi använder Set() för att ta bort dubbletter, och .filter(Boolean) för att undvika tomma värden
  const teamProducts = [
    ...new Set(leagueProducts.map((product) => product.team)),
  ].filter(Boolean);

  // 3. Om ett LAG är valt i URL:en, filtrera listan en gång till, annars visa hela ligan
  const displayedProducts = teamName
    ? leagueProducts.filter((product) => {
        const dbTeamSlug = product.team.toLowerCase().replace(/\s+/g, "-");
        return dbTeamSlug === teamName;
      })
    : leagueProducts;
  return (
    <div className="products-page-container">
      {/* 1. KATEGORIRADEN (FilterRow) */}
      <div className="category-nav">
        {!leagueName ? (
          // VISAS OM INGEN LIGA ÄR VALD (Standardmenyn)
          <>
            <Link to="/products" className="Category-link">
              Visa alla ligor
            </Link>
            <Link to="/products/allsvenskan" className="Category-link">
              Allsvenskan
            </Link>
            <Link to="/products/serie-a" className="Category-link">
              Serie A
            </Link>
            <Link to="/products/la-liga" className="Category-link">
              La Liga
            </Link>
            <Link to="/products/premier-league" className="Category-link">
              Premier League
            </Link>
          </>
        ) : (
          // VISAS OM EN LIGA ÄR VALD (Klubbmenyn)
          <>
            <Link
              to="/products"
              className="Category-link"
              style={{ fontWeight: "bold" }}
            >
              ← Tillbaka till ligor
            </Link>

            {/* Loopa ut alla unika lag som knappar */}
            {teamProducts.map((team) => {
              // Skapa en slug av lagnamnet för URL:en (t.ex. "Malmö FF" -> "malmo-ff")
              const teamSlug = team.toLowerCase().replace(/\s+/g, "-");

              return (
                <Link
                  key={team}
                  to={`/products/${leagueName}/${teamSlug}`}
                  className="Category-link"
                >
                  {team}
                </Link>
              );
            })}
          </>
        )}
      </div>

      {/* 2. META-RADEN (Antal produkter & Sorteringsknapp) */}
      <div
        className="products-meta-row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0",
        }}
      >
        <div className="product-count">
          Antal Produkter: <strong>{leagueProducts.length}</strong>
        </div>

        <button
          className="filter-sort-btn"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          Filter och sortering
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* 3. PRODUKTNÄTET (ProductGrid) */}
      {isLoading ? (
        <p>Laddar produkter...</p>
      ) : (
        <ProductGrid products={displayedProducts} />
      )}
    </div>
  );
}
