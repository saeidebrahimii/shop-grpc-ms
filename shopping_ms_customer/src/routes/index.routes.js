const { Router } = require("express");
const customerController = require("../controllers/customer.controller");
const { authGuard } = require("../middlewares/auth.guard");
const router = Router();

router.get("/",authGuard, customerController.getAllUsers);
router.post("/",customerController.createUser)
router.get("/:id",customerController.getUser)
router.put("/:id",customerController.editUser)
router.delete("/:id",customerController.deleteUser)

router.post("/login",customerController.loginUser)
// router.post("/auth/validate",)

module.exports = { indexRoutes: router };
