const { Router } = require("express");
const productController = require("../controllers/product.controller");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/../../uploads"));
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });
const router = Router();
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);
router.post("/", upload.single("image"), productController.createProduct);
router.put("/:id", upload.single("image"), productController.editProduct);
router.delete("/:id", productController.deleteProduct);
module.exports = { indexRoutes: router };
