const cartModel = require("../models/cart.model");

class CartService {
  async addToCart(userId, productId, qty) {
    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = await cartModel.create({
        userId,
        items: [{ productId, qty }],
      });
      return cart;
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === productId.toString()
    );

    if (item) {
      item.qty += qty;
    } else {
      cart.items.push({ productId, qty });
    }

    await cart.save();
    return cart;
  }
}

module.exports = CartService;
