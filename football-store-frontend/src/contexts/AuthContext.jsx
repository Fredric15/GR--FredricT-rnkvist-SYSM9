import { useState, createContext, useContext, useEffect } from "react";
import { isAuthenticated, setToken, logout } from "../api";

const AuthContext = createContext(null);

// En flagga för att undvika att visa flera alert när token har gått ut
let hasAlertedForExpiredToken = false;

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  function login(token) {
    setToken(token);
    setIsAuth(true);
    hasAlertedForExpiredToken = false;
  }

  function logoutUser() {
    logout();
    setIsAuth(false);
  }

  // Lyssna på "auth-expired" eventet för att automatiskt logga ut användaren
  useEffect(() => {
    const handleTokenExpired = () => {
        //Med detta så undviker jag att visa alerten två gånger när token har gått ut
      if (!hasAlertedForExpiredToken) {
        alert("Din session har gått ut. Vänligen logga in igen.");
        hasAlertedForExpiredToken = true;
      }
      logoutUser();
    };

    window.addEventListener("auth-expired", handleTokenExpired);
    return () => {
      window.removeEventListener("auth-expired", handleTokenExpired);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, login, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
