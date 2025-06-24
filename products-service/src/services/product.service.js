const productModel = require("../models/product.model");

class ProductService {
  async createProduct(title, description, image,category, price, qty) {
    const product = await productModel.create({
      title,
      description,
      image,
      category,
      price,
      qty,
    });
    return product;
  }
  async getAllProducts() {
    const products = await productModel.find({});
    return products;
  }
  async getProduct(id) {
    const product = await productModel.findById(id);
    return product;
  }
  async deleteProduct(id) {
    const deletedProduct = await productModel.deleteOne({ _id: id });
    return deletedProduct;
  }
  async updateProduct(id, object) {
    const product = await productModel.updateOne({ _id: id }, { $set: object });
    return product;
  }
}
module.exports = ProductService;
