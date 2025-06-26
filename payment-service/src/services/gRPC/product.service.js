const { productClient } = require("../../server");

class ProductService {
  async getProductById(productId) {
      return new Promise((resolve, reject) => {
        productClient.GetProduct({ id: productId }, (error, response) => {
          if (error) return reject(error);
          resolve(response);
        });
      });
  }
}
module.exports = ProductService;
