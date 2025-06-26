const { cartClient } = require("../../server");

class CartService {
  async getCartById(cartId) {
      return new Promise((resolve, reject) => {
        cartClient.GetCart({ id: cartId }, (error, response) => {
          if (error) return reject(error);
          resolve(response);
        });
      });
  }
  async lockedCart(cartId) {
      return new Promise((resolve, reject) => {
        cartClient.LockedCart({ id: cartId }, (error, response) => {
          if (error) return reject(error);
          resolve(response);
        });
      });
  }
  async paidCart(cartId) {
      return new Promise((resolve, reject) => {
        cartClient.PaidCart({ id: cartId }, (error, response) => {
          if (error) return reject(error);
          resolve(response);
        });
      });
  }
}
module.exports = CartService;
