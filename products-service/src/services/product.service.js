const productModel = require("../models/product.model");
const { getOrSetCache, deleteCache } = require("./redis.service");

class ProductService {
  async createProduct(title, description, image, category, price, qty) {
    const product = await productModel.create({
      title,
      description,
      image,
      category,
      price,
      qty,
    });

    await deleteCache("products");

    return product;
  }

  async getAllProducts() {
    return await getOrSetCache("products", async () => {
      return await productModel.find({});
    });
  }

  async getPaginatedProducts(page = 1, limit = 10) {
    return await getOrSetCache(`products:page:${page}:limit:${limit}`, async () => {
      const skip = (page - 1) * limit;
      const products = await productModel.find().skip(skip).limit(limit);
      const total = await productModel.countDocuments();
      return { products, total, page, pages: Math.ceil(total / limit) };
    });
  }

  async getProduct(id) {
    return await getOrSetCache(`product:${id}`, async () => {
      return await productModel.findById(id);
    });
  }

  async deleteProduct(id) {
    const deletedProduct = await productModel.deleteOne({ _id: id });

    if (deletedProduct.deletedCount > 0) {
      await deleteCache("products");
      await deleteCache(`product:${id}`);
    }

    return deletedProduct;
  }

  async updateProduct(id, object) {
    const product = await productModel.updateOne({ _id: id }, { $set: object });

    if (product.modifiedCount > 0) {
      await deleteCache("products");
      await deleteCache(`product:${id}`);
    }

    return product;
  }
}

module.exports = ProductService;
