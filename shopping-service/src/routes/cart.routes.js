const { Router } = require("express");
const cartController = require("../controllers/cart.controller");
const { authGuard } = require("../middlewares/auth.guard");

const router = Router();

router.use(authGuard);

router.post("/add/:productId", cartController.addToCart);
router.get("/:cartId", cartController.getCart);

module.exports = { cartRoutes: router };
