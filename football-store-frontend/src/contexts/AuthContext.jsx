import { useState, createContext, useContext, useEffect } from "react";
import { isAuthenticated, setToken, logout } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  function login(token) {
    setToken(token);
    setIsAuth(true);
  }

  function logoutUser() {
    logout();
    setIsAuth(false);
  }

  // Lyssna på "auth-expired" eventet för att automatiskt logga ut användaren
  useEffect(() => {
    const handleTokenExpired = () => {
      alert("Din session har gått ut. Vänligen logga in igen.");
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
