const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  // Validera att alla obligatoriska fält är ifyllda
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Vänligen fyll i alla obligatoriska fält");
  }

  // Kontrollera om användaren redan finns
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email är redan registrerad");
  }

  // Hasha lösenordet
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Skapa användaren
  const user = await User.create({
    name,
    email,
    phone,
    address,
    password: hashedPassword,
  });

  // Om användaren skapades framgångsrikt, returnera användardata
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Ogiltiga användardata");
  }
});

// @desc    Logga in användare och få token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Vänligen fyll i både email och lösenord");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      { user: { id: user.id, email: user.email, isAdmin: user.isAdmin } },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Ogiltiga inloggningsuppgifter");
  }
});

// @desc    Hämta alla användare
// @route   GET /api/users
// @access  Public
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password"); // Skickar inte med lösenordet i svaret
  res.json(users);
});

// @desc    Hämta användarprofil
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password"); // Skickar inte med lösenordet i svaret

  if (user) {
    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Användare hittades inte");
  }
});

// @desc    Uppdatera användarprofil
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    if (req.body.address) {
      user.address.street = req.body.address.street || user.address.street;
      user.address.postalCode =
        req.body.address.postalCode || user.address.postalCode;
      user.address.city = req.body.address.city || user.address.city;
      user.address.country = req.body.address.country || user.address.country;
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
    });
  } else {
    res.status(404);
    throw new Error("Användare hittades inte");
  }
});

// @desc Ta bort en användare
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "Användare borttagen" });
  } else {
    res.status(404);
    throw new Error("Användare hittades inte");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
