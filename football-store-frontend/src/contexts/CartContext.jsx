import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Ladda korgen från localstorage eller starta med en tom array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  //Spara korgen i localstorage varje gång cartItems ändras
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Funktion för att lägga till en produkt i korgen
  function addToCart(product) {
    setCartItems((prevItems) => {
      //Kontrollera om produkten redan finns i korgen
      const existingItem = prevItems.find((item) => item._id === product._id);

      if (existingItem) {
        // Om produkten redan finns, öka mängden
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  }
}

// Funktion för att ta bort en produkt från korgen
function removeFromCart(productId) {
  setCartItems((prevItems) =>
    prevItems.filter((item) => item._id !== productId),
  );
}

// Funktion för att rensa korgen, till exempel efter en lyckad order
function clearCart() {
  setCartItems([]);
}

//Räkna totalpris med hjälp av reduce()
function cartTotal() {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}

//Räkna totala antal produkter i korgen med reduce()
function cartCount() {
  return cartItems.reduce((count, item) => count + item.quantity, 0);
}

return (
  <CartContext.Provider
    value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      cartTotal,
      cartCount,
    }}
  >
    {children}
  </CartContext.Provider>
);

export function useCart() {
  return useContext(CartContext);
}
