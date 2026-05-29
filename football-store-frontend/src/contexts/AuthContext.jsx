import { useState, createContext, useContext } from "react";
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

  return (
    <AuthContext.Provider value={{ isAuth, login, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
