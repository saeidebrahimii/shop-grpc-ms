const paymentModel = require("../models/payment.model");

class PaymentService {
  async create(userId, cartId, amount, currency, gateway, gatewayRefId) {
    return paymentModel.create({
      userId,
      cartId,
      amount,
      currency,
      status: "pending",
      gateway,
      gatewayRefId,
    });
  }

  async getPaymentByAuthority(authority) {
    return paymentModel.findOne({ gatewayRefId: authority });
  }
}

module.exports = PaymentService;