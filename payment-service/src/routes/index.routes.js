const { Router } = require("express");
const paymentController = require("../controllers/payment.controller");
const { authGuard } = require("../middlewares/auth.guard");

const router = Router();

router.post("/:cartId", authGuard, paymentController.payment);
router.get("/callback", paymentController.callback);

module.exports = { indexRoutes: router };
