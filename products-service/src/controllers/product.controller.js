const autoBind = require("auto-bind");
const ProductService = require("../services/product.service");
const { isValidObjectId } = require("mongoose");
const fs = require("fs");
class ProductController {
  #service;
  constructor() {
    this.#service = new ProductService();
    autoBind(this);
  }
  async getAllProducts(req, res) {
    try {
      const products = await this.#service.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ msg: "Error fetch all products." });
    }
  }
  async getProduct(req, res) {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id))
        return res.status(404).json({ msg: "product not found" });
      const product = await this.#service.getAllProducts(id);
      if (!product) return res.status(404).json({ msg: "product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ msg: "Error fetch product." });
    }
  }
  async createProduct(req, res) {
    const { path } = req.file;
    try {
      const { title, description, price, category, qty } = req.body;
      const product = await this.#service.createProduct(
        title,
        description,
        path,
        category,
        price,
        qty
      );
      return res.json(product);
    } catch (error) {
      if (fs.existsSync(path)) [fs.unlinkSync(path)];
      res.status(500).json({ msg: "Error create product." });
    }
  }
  async editProduct(req, res) {
    const { path } = req.file;
    try {
      const { id } = req.params;
      const object = req.body;
      if (path) {
        object["image"] = path;
        const product = await this.#service.getProduct(id);
        fs.unlinkSync(product.image);
      }
      const product = await this.#service.updateProduct(id, object);
      if (product?.modifiedCount > 0) {
        return res.json({ msg: "edit product successfully" });
      } else {
        return res.json({ msg: "edit product failed." });
      }
    } catch (error) {
      if (path) {
        if (fs.existsSync(path)) {
          fs.unlinkSync(path);
        }
      }
      res.status(500).json({ msg: "Error create product." });
    }
  }
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id))
        return res.status(404).json({ msg: "product not found" });
      const product = await this.#service.getProduct(id);
      if (fs.existsSync(product?.image)) fs.unlinkSync(product?.image);
      const deletedProduct = await this.#service.deleteProduct(id);
      if (deletedProduct?.deletedCount > 0) {
        res.json({ msg: "Delete successfully" });
      } else {
        res.json({ msg: "Deleted failed." });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error delete product" });
    }
  }
}
module.exports = new ProductController();
