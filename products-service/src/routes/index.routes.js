const { Router } = require("express");
const productController = require("../controllers/product.controller");
const multer = require("multer");
const path = require("path");
const config = require("../config/config");
const { authGuard } = require("../middlewares/auth.guard");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.app.uploads);
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only jpg and png allowed."));
    }
    cb(null, true);
  },
});
const router = Router();

router.get("/", authGuard, productController.getAllProducts);
router.get("/:id", authGuard, productController.getProduct);
router.post(
  "/",
  authGuard,
  upload.single("image"),
  productController.createProduct
);
router.put(
  "/:id",
  authGuard,
  upload.single("image"),
  productController.editProduct
);
router.delete("/:id", authGuard, productController.deleteProduct);

module.exports = { indexRoutes: router };
