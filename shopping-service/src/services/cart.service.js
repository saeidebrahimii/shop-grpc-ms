const cartModel = require("../models/cart.model");
const { getOrSetCache, deleteCache } = require("./redis.service");
const mongoose = require("mongoose");

class CartService {
  async addToCart(userId, productId, qty) {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid IDs");
      }

      let cart = await cartModel.findOne({ userId }).sort({ createdAt: -1 });

      if (!cart || cart.status === "paid") {
        cart = await cartModel.create({
          userId,
          items: [{ productId, qty }],
          status: "active",
        });
        await deleteCache(`cart:user:${userId}`);
        return cart;
      }

      if (cart.status !== "locked") {
        const item = cart.items.find(
          (i) => i.productId.toString() === productId.toString()
        );

        if (item) {
          item.qty += qty;
        } else {
          cart.items.push({ productId, qty });
        }

        await cart.save();
        await deleteCache(`cart:user:${userId}`);
        await deleteCache(`cart:${cart._id}`);
        return cart;
      }

      return false;
    } catch (err) {
      console.error("CartService addToCart error:", err.message);
      throw err;
    }
  }

  async getCartById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid cart ID");
      }

      return await getOrSetCache(`cart:${id}`, async () => {
        return await cartModel.findById(id).populate("items.productId", "title price image");
      });
    } catch (err) {
      console.error("CartService getCartById error:", err.message);
      throw err;
    }
  }

  async lockCartById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid cart ID");
      }

      const cart = await cartModel.findById(id);
      if (cart && cart.status !== "locked" && cart.status !== "paid") {
        cart.status = "locked";
        await cart.save();
        await deleteCache(`cart:${id}`);
        await deleteCache(`cart:user:${cart.userId}`);
        return true;
      }

      return false;
    } catch (err) {
      console.error("CartService lockCartById error:", err.message);
      throw err;
    }
  }

  async paidCartById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid cart ID");
      }

      const cart = await cartModel.findById(id);
      if (cart && cart.status !== "paid") {
        cart.status = "paid";
        await cart.save();
        await deleteCache(`cart:${id}`);
        await deleteCache(`cart:user:${cart.userId}`);
        return true;
      }

      return false;
    } catch (err) {
      console.error("CartService paidCartById error:", err.message);
      throw err;
    }
  }
}

module.exports = CartService;
