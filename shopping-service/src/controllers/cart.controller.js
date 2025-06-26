const autoBind = require("auto-bind");
const CartService = require("../services/cart.service");
const ProductService = require("../services/gRPC/product.service");
const mongoose = require("mongoose");

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
      const userId = req.user?.userId;

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ msg: "Invalid product ID." });
      }

      const quantity = parseInt(qty);
      if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ msg: "Invalid quantity." });
      }

      const product = await this.#productService.getProductById(productId);
      if (!product) return res.status(404).json({ msg: "Product not found." });

      if (quantity > product.qty) {
        return res
          .status(400)
          .json({ msg: "Requested quantity exceeds product stock." });
      }

      const cart = await this.#service.addToCart(userId, productId, quantity);
      if (!cart) {
        return res.status(423).json({
          msg: "Your cart is locked. Please wait or complete payment.",
        });
      }

      res.status(200).json(cart);
    } catch (error) {
      console.error("Add to cart error:", error);
      res.status(500).json({ msg: "Server error while adding to cart." });
    }
  }

  async getCart(req, res) {
    try {
      const { cartId } = req.params;
      const userId = req.user?.userId;

      if (!mongoose.Types.ObjectId.isValid(cartId)) {
        return res.status(400).json({ msg: "Invalid cart ID." });
      }

      const cart = await this.#service.getCartById(cartId);

      if (!cart || cart.status === "paid") {
        return res.status(404).json({ msg: "Cart not found or already paid." });
      }

      if (cart.userId.toString() !== userId) {
        return res.status(403).json({ msg: "Unauthorized access to this cart." });
      }

      res.status(200).json(cart);
    } catch (error) {
      console.error("Get cart error:", error);
      res.status(500).json({ msg: "Server error while fetching cart." });
    }
  }
}

module.exports = new CartController();
