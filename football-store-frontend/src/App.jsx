import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Navbar />
        </div>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:leagueName" element={<ProductsPage />} />
            <Route
              path="/products/:leagueName/:teamName"
              element={<ProductsPage />}
            />
          </Routes>
        </main>

        <Footer />
      </Router>
    </>
  );
}

export default App;
