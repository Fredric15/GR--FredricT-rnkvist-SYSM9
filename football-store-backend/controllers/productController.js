const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// @desc    Hämta alla produkter
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Hämta en produkt med ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Produkt hittades inte");
  }
});

// @desc    Skapa en ny produkt
// @route   POST /api/products
// @access  Public
const createProduct = asyncHandler(async (req, res) => {
  const { name, team, league, description, price, imageUrl } = req.body;

  const product = new Product({
    name,
    team,
    league,
    description,
    price,
    imageUrl,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Uppdatera en produkt
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = asyncHandler(async (req, res) => {
  const { name, team, league, description, price, imageUrl } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.team = team || product.team;
    product.league = league || product.league;
    product.description = description || product.description;
    product.price = price || product.price;
    product.imageUrl = imageUrl || product.imageUrl;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Produkt hittades inte");
  }
});

// @desc    Ta bort en produkt
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: "Produkt borttagen" });
  } else {
    res.status(404);
    throw new Error("Produkt hittades inte");
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
