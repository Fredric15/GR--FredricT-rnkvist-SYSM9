const API_BASE = "http://localhost:5000/api";

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}

export function getProducts() {
  return request("/products", {
    method: "GET",
  });
}

export function getProductById(id) {
  return request(`/products/${id}`, {
    method: "GET",
  });
}

export function LoginUser(email, password) {
  return request("/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function RegisterUser(name, email, password) {
  return request("/users/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function createOrder(orderData) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}

export function getMyOrders() {
  return request("/orders/myorders", {
    method: "GET",
  });
}

//Genrella request-funktionen

async function request(path, options = {}) {
  const headers = options.headers || {};
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  headers["Content-Type"] = "application/json";

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch (e) {
    // Om det inte är JSON, returnera texten som den är
    data = text;
  }

  if (!response.ok) {
    console.log("Fel från backend:", data);

    const errorMessage =
      data?.message || data?.error || "Ett fel inträffade. Försök igen senare.";
    throw new Error(errorMessage);
  }

  return data;
}
