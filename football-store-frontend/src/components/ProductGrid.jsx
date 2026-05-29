import ProductCard from "./ProductCard.jsx";
import "./ProductGrid.css";

export default function ProductGrid({ products, variant = "grid" }) {
  if (!products || products.length === 0) {
    return <p>Inga produkter hittades.</p>;
  }

  const gridClass = variant === "grid" ? "product-grid" : "product-carousel";

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
