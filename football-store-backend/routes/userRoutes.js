const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  toggleFavoriteProduct,
  getFavoriteProducts,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

//Öppna routes
router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

//Skyddade routes
router
  .get("/profile", validateToken, getUserProfile)
  .put("/profile", validateToken, updateUserProfile);
router.delete("/:id", validateToken, deleteUser);

router
  .post("/favorites", validateToken, toggleFavoriteProduct)
  .get("/favorites", validateToken, getFavoriteProducts);

module.exports = router;
