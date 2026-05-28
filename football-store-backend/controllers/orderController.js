const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");

// @desc    Skapa en ny order
// @route   POST /api/orders
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, email, shippingAddress, totalPrice, paymentMethod } =
    req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("Inga orderartiklar");
  }

  let userId = null;

  // Försök att hämta token från headern
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      //Om token finns, spara userId i orderModeln
      userId = decoded.user.id;
    } catch (error) {
      console.log("Ogiltig token, fortsätter som gäst med null som userId");
    }
  }

  const order = new Order({
    user: userId,
    email,
    orderItems,
    shippingAddress,
    totalPrice,
    paymentMethod,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Hämta en användares alla order
// @route   GET /api/orders/myorders
// @access  Private
const getOrderByUserId = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
});

module.exports = {
  createOrder,
  getOrderByUserId,
};
