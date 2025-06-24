const autoBind = require("auto-bind");
const CartService = require("../services/cart.service");
const { getProductById } = require("../server");
const ProductService = require("../services/gRPC/product.service");

class CartController {
  #service;
  #productService;
  constructor() {
    this.#service = new CartService();
    this.#productService = new ProductService();
    autoBind(this);
  }
  async addToCart(req, res) {
    try {
      const { productId } = req.params;
      const { qty } = req.body;
      const product = await this.#productService.getProductById(productId);
      if (!product) return res.status(404).json({ msg: "product not found" });
      if (qty > product?.qty)
        return res.status(400).json({ msg: "qty is grater than" });
      const { userId } = req.user;
      const cart = await this.#service.addToCart(userId, productId, qty);
      res.json(cart);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Error add to cart." });
    }
  }
}

module.exports = new CartController();
