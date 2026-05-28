const exress = require("express");
const router = exress.Router();
const {
  createOrder,
  getOrderByUserId,
} = require("../controllers/orderController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/").post(createOrder);
router.route("/myorders").get(validateToken, getOrderByUserId);

module.exports = router;
