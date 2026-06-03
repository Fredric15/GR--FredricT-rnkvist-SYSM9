import React, { useState, useEffect, useMemo, useRef } from "react";
import { getProducts } from "../api";
import { useCart } from "../contexts/CartContext.jsx";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import { ArrowUpDown } from "lucide-react";
import { useFavorites } from "../contexts/FavoritesContext.jsx";
import "./ProductsPage.css";

const sortStrategies = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "name-asc": (a, b) => a.name.localeCompare(b.name),
  "name-desc": (a, b) => b.name.localeCompare(a.name),
  default: () => 0,
};

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { leagueName, teamName } = useParams();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortMethod, setSortMethod] = useState("default");
  const { favoriteProducts } = useFavorites();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  // Ref för sorteringsmenyn, används för att kunna stänga menyn med klick utanför
  const sortMenuRef = useRef(null);

  //useEffect för att stänga sorteringsmenyn när man klickar utanför
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // Om det finns en sökterm i URL:en, filtrera produkterna baserat på namn, lag eller liga
  //Använder useMemo för att undvika onödiga beräkningar vid varje sökning
  const searchedProducts = useMemo(() => {
    if (!searchQuery) return allProducts;

    return allProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchQuery) ||
        product.team.toLowerCase().includes(searchQuery) ||
        product.league.toLowerCase().includes(searchQuery)
      );
    });
  }, [allProducts, searchQuery]);

  const leagueProducts = useMemo(() => {
    // Finns det ingen "liga" i URL:en?
    // Avbryt direkt och skicka tillbaka hela listan med produkter!
    if (!leagueName) {
      return searchedProducts;
    }

    // Står det "favorites" i URL:en?
    // Då filtrerar vi fram de tröjor som matchar användarens favoritlista.
    if (leagueName.toLowerCase() === "favorites") {
      return searchedProducts.filter((product) =>
        favoriteProducts.some(
          (fav) => fav._id === product._id || fav === product._id,
        ),
      );
    }

    // Om koden kommer hit MÅSTE det vara en vanlig liga (t.ex. serie-a).
    // Då filtrerar vi på liganamnet som vanligt.
    return searchedProducts.filter((product) => {
      const dbSlug = product.league.toLowerCase().replace(/\s+/g, "-");
      return dbSlug === leagueName.toLowerCase();
    });
  }, [searchedProducts, leagueName, favoriteProducts]);

  // Skapa en unik lista med alla lag som finns i den aktuella ligan (för menyn)
  // Vi använder Set() för att ta bort dubbletter, och .filter(Boolean) för att undvika tomma värden
  const teamProducts = [
    ...new Set(leagueProducts.map((product) => product.team)),
  ].filter(Boolean);

  // Om ett LAG är valt i URL:en, filtrera listan en gång till, annars visa hela ligan
  const displayedProducts = teamName
    ? leagueProducts.filter((product) => {
        const dbTeamSlug = product.team.toLowerCase().replace(/\s+/g, "-");
        return dbTeamSlug === teamName;
      })
    : leagueProducts;

  const sortedProducts = useMemo(
    () =>
      [...displayedProducts].sort(
        sortStrategies[sortMethod] || sortStrategies["default"],
      ),
    [displayedProducts, sortMethod],
  );

  return (
    <div className="page-container">
      <div className="products-page">
        {/* 1. KATEGORIRADEN (FilterRow) */}
        <div className="products-page__categories">
          {!leagueName ? (
            // VISAS OM INGEN LIGA ÄR VALD (Standardmenyn)
            <>
              <Link
                to="/products/allsvenskan"
                className="products-page__category-link"
              >
                Allsvenskan
              </Link>
              <Link
                to="/products/serie-a"
                className="products-page__category-link"
              >
                Serie A
              </Link>
              <Link
                to="/products/la-liga"
                className="products-page__category-link"
              >
                La Liga
              </Link>
              <Link
                to="/products/premier-league"
                className="products-page__category-link"
              >
                Premier League
              </Link>
            </>
          ) : (
            // VISAS OM EN LIGA ÄR VALD (Klubbmenyn)
            <>
              <Link
                to="/products"
                className="products-page__category-link products-page__category-link--back"
              >
                ← Tillbaka till ligor
              </Link>

              {/* Loopa ut alla unika lag som knappar */}
              {teamProducts.map((team) => {
                // Skapa en slug av lagnamnet för URL:en (t.ex. "Malmö FF" -> "malmo-ff")
                const teamSlug = team.toLowerCase().replace(/\s+/g, "-");
                const isActive = teamSlug === teamName; // Kolla om det är det valda laget

                return (
                  <Link
                    key={team}
                    to={`/products/${leagueName}/${teamSlug}`}
                    className={`products-page__category-link ${isActive ? "products-page__category-link--active" : ""}`}
                  >
                    {team}
                  </Link>
                );
              })}
            </>
          )}
        </div>

        {/* 2. META-RADEN (Antal produkter & Sorteringsknapp) */}
        <div className="products-page__meta">
          <div className="products-page__count">
            Antal Produkter: <strong>{displayedProducts.length}</strong>
          </div>

          <div className="products-page__sort-container" ref={sortMenuRef}>
            <button
              className="products-page__filter-btn"
              onClick={() => setIsSortOpen((prev) => !prev)}
            >
              Sortering
              <ArrowUpDown size={18} />
            </button>

            {isSortOpen && (
              <div className="products-page__sort-dropdown">
                <button
                  className={sortMethod === "price-asc" ? "active" : ""}
                  onClick={() => {
                    setSortMethod("price-asc");
                    setIsSortOpen(false); // Stänger menyn vid klick
                  }}
                >
                  Pris: Lågt till högt
                </button>
                <button
                  className={sortMethod === "price-desc" ? "active" : ""}
                  onClick={() => {
                    setSortMethod("price-desc");
                    setIsSortOpen(false);
                  }}
                >
                  Pris: Högt till lågt
                </button>
                <button
                  className={sortMethod === "name-asc" ? "active" : ""}
                  onClick={() => {
                    setSortMethod("name-asc");
                    setIsSortOpen(false);
                  }}
                >
                  Bokstavsordning (A-Ö)
                </button>
                <button
                  className={sortMethod === "name-desc" ? "active" : ""}
                  onClick={() => {
                    setSortMethod("name-desc");
                    setIsSortOpen(false);
                  }}
                >
                  Bokstavsordning (Ö-A)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3. PRODUKTNÄTET (ProductGrid) */}
        {isLoading ? (
          <p>Laddar produkter...</p>
        ) : (
          <ProductGrid products={sortedProducts} />
        )}
      </div>
    </div>
  );
}
