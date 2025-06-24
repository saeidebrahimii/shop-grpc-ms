const autoBind = require("auto-bind");
const CustomerService = require("../services/gRPC/customer.service");

class AuthGuard {
  #customer;
  constructor() {
    this.#customer = new CustomerService();
    autoBind(this);
  }
  async auth(req, res, next) {
    const { api_key } = req?.headers;
    if (!api_key) return res.status(401).json({ msg: "api_key not provided" });
    try {
      const decoded = await this.#customer.validateToken(api_key);
      if (decoded.valid) {
        req.user = { userId: decoded.userId };
        next();
      } else {
        res.status(401).json({ msg: "login again" });
      }
    } catch (error) {
      res.status(401).json({ msg: "Invalid token" });
    }
  }
}

module.exports = new AuthGuard();
