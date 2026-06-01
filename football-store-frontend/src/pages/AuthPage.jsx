import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser, RegisterUser } from "../api";
import { useAuth } from "../contexts/AuthContext.jsx";
import "./AuthPage.css";

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLoginMode && formData.password !== formData.confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }

    try {
      let data;
      if (isLoginMode) {
        data = await LoginUser(formData.email, formData.password);
      } else {
        data = await RegisterUser(
          formData.name,
          formData.email,
          formData.password,
        );
      }

      const token = data.accessToken;
      console.log("Token från API:", token); // Logga token för felsökning
      if (token) {
        login(token);
        navigate("/profile");
      } else {
        setError(
          "Inloggning misslyckades. Kontrollera dina uppgifter och försök igen.",
        );
      }
    } catch (err) {
      setError(err.message || "Ett fel inträffade. Försök igen senare.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-card__title">
          {isLoginMode ? "Välkommen tillbaka" : "Skapa ett konto"}
        </h1>

        {error && <div className="auth-card__error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="name">För- och efternamn</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLoginMode}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">E-postadress</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Lösenord</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Bekräfta lösenord</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={!isLoginMode}
                minLength="6"
              />
            </div>
          )}

          <button type="submit" className="auth-form__submit-btn">
            {isLoginMode ? "Logga in" : "Registrera dig"}
          </button>
        </form>

        <div className="auth-card__toggle">
          {isLoginMode ? "Har du inget konto? " : "Har du redan ett konto? "}
          <button
            type="button"
            className="auth-card__toggle-btn"
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? "Skapa ett här" : "Logga in här"}
          </button>
        </div>
      </div>
    </div>
  );
}
