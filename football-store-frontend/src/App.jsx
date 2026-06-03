import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Footer from "./components/Footer.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx";
import { isAuthenticated } from "./api.js";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./App.css";

function App() {
  // En enkel komponent för att skydda routes som kräver inloggning
  function RequireAuth({ children }) {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }
    return children;
  }
  return (
    <>
      <Router>
        <div className="app">
          <Navbar />
          <ScrollToTop />
          <main className="app__main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:leagueName" element={<ProductsPage />} />
              <Route
                path="/products/:leagueName/:teamName"
                element={<ProductsPage />}
              />
              <Route
                path="/products/:leagueName/:teamName/:productId"
                element={<ProductDetailPage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmationPage />}
              />
              <Route path="/login" element={<AuthPage />} />


              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
