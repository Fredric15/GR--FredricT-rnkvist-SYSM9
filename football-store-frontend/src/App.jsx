import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <nav>
          <Link to="/">Home</Link>

          <Link to="/products">Products</Link>

          <Link to="/cart">Cart</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Welcome to the Football Store!</h1>} />
          <Route path="/products" element={<h1>Product List</h1>} />
          <Route path="/cart" element={<h1>Your Cart</h1>} />
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
