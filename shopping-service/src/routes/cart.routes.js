const { Router } = require("express");
const cartController = require("../controllers/cart.controller");
const authGuard = require("../middlewares/auth.guard");

const router = Router();

router.post("/add/:productId",authGuard.auth ,cartController.addToCart);

module.exports = { cartRoutes: router };
