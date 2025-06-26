const { Router } = require("express");
const customerController = require("../controllers/customer.controller");
const { authGuard } = require("../middlewares/auth.guard");
const router = Router();

router.get("/", authGuard, customerController.getAllUsers);
router.post("/", customerController.createUser);
router.post("/login", customerController.loginUser);

router.get("/:id", authGuard, customerController.getUser);
router.put("/:id", authGuard, customerController.editUser);
router.delete("/:id", authGuard, customerController.deleteUser);

module.exports = { indexRoutes: router };
