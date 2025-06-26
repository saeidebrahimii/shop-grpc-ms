const { productClient } = require("../../server");

class ProductService {
  getProductById(productId) {
    return new Promise((resolve, reject) => {
      productClient.GetProduct({ id: productId }, (error, response) => {
        if (error || !response) {
          return reject(new Error("Product not found or gRPC error."));
        }
        resolve(response);
      });
    });
  }
}

module.exports = ProductService;
