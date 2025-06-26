const { Router } = require("express");
const { cartRoutes } = require("./cart.routes");

const router = Router();

router.use("/cart", cartRoutes);

module.exports = { indexRoutes: router };
