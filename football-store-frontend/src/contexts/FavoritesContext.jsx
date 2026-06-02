import { createContext, useContext, useState, useEffect } from "react";
import { getFavoriteProductsAPI, toggleFavoriteAPI } from "../api.js";
import { useAuth } from "./AuthContext.jsx";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { isAuth } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  //Hämta listan från databasen när användaren loggar in eller när auth-statusen ändras
  useEffect(() => {
    console.log("Auth status ändrad, isAuth:", isAuth);
    if (isAuth) {
      console.log("Användaren är inloggad, hämtar favoriter...");
      fetchFavoriteProducts();
    } else {
      console.log("Användaren är inte inloggad, rensar favoriter...");
      setFavoriteProducts([]); // Rensa favoriter om inte inloggad
    }
  }, [isAuth]);

  const fetchFavoriteProducts = async () => {
    try {
      const data = await getFavoriteProductsAPI();

      setFavoriteProducts(data?.favoriteProducts || []); // Uppdatera med data från API
    } catch (err) {
      console.error("Kunde inte hämta favoriter:", err);
    }
  };

  const toggleFavorite = async (product) => {
    const isFavorite = favoriteProducts.some((fav) => fav._id === product._id);

    if (isFavorite) {
      setFavoriteProducts((prev) =>
        prev.filter((fav) => fav._id !== product._id),
      );
    } else {
      setFavoriteProducts((prev) => [...prev, product]);
    }

    try {
      await toggleFavoriteAPI(product._id);
    } catch (err) {
      console.error("Kunde inte uppdatera favoriter:", err);
      fetchFavoriteProducts(); // Återställ favoritlistan vid fel
    }
  };

  // Funktion för att låta produktkorten veta om en produkt är favorit
  const checkIsFavorite = (productId) => {
    if (!Array.isArray(favoriteProducts)) return false; // Säkerställ att det är en array innan some() anropas

    return favoriteProducts.some((fav) => {
      if (fav && fav._id) {
        return fav._id === productId;
      }

      return fav === productId; // Fallback om fav inte har _id, jämför direkt med productId
    });
  };

  console.log("Mina favoriter i Context just nu:", favoriteProducts);

  return (
    <FavoritesContext.Provider
      value={{ favoriteProducts, toggleFavorite, checkIsFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
