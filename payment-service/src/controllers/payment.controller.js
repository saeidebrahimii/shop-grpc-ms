const autoBind = require("auto-bind");
const CartService = require("../services/gRPC/cart.service");
const PaymentService = require("../services/payment.service");
const {
  zarinpalPayment,
  zarinpalPaymentVerify,
} = require("../services/zarinpal.service");
const config = require("../config/config");

class PaymentController {
  #service;
  #cartService;

  constructor() {
    this.#service = new PaymentService();
    this.#cartService = new CartService();
    autoBind(this);
  }

  async payment(req, res) {
    try {
      const { cartId } = req.params;
      const { amount, description, mobile = null, email = null, orderId = null } = req.body;
      const userId = req.user?.userId;

      if (!userId || !amount || !description) {
        return res.status(400).json({ msg: "Missing required fields" });
      }

      const cart = await this.#cartService.getCartById(cartId);
      if (!cart?.valid || cart?.userId !== userId || cart?.status === "paid") {
        return res.status(400).json({ msg: "Invalid or paid cart" });
      }

      const requestZarinpal = await zarinpalPayment(
        config.payment.merchantId,
        amount,
        config.payment.currency,
        description,
        config.payment.callbackUrl,
        mobile,
        email,
        orderId
      );

      if (!requestZarinpal?.authority) {
        return res.status(500).json({ msg: "Failed to create zarinpal payment" });
      }

      const lockedCart = await this.#cartService.lockedCart(cartId);
      if (!lockedCart?.status) {
        return res.status(500).json({ msg: "Failed to lock cart" });
      }

      await this.#service.create(
        userId,
        cartId,
        amount,
        config.payment.currency,
        "zarinpal",
        requestZarinpal.authority
      );

      return res.json({
        url: `${config.payment.zarinpal.url}/pg/StartPay/${requestZarinpal.authority}`,
      });

    } catch (error) {
      console.error("❌ Payment error:", error);
      res.status(500).json({ msg: "Internal server error during payment" });
    }
  }

  async callback(req, res) {
    try {
      const { Status: status, Authority: authority } = req.query;

      if (status !== "OK" || !authority) {
        return res.status(400).json({ msg: "Payment failed", statusCode: "NOK" });
      }

      const payment = await this.#service.getPaymentByAuthority(authority);
      if (!payment) {
        return res.status(404).json({ msg: "Payment not found" });
      }

      const verifyPayment = await zarinpalPaymentVerify(
        config.payment.merchantId,
        payment.amount,
        authority
      );

      if (verifyPayment?.code === 100) {
        await this.#cartService.paidCart(payment.cartId);
        return res.json({ msg: "Payment successful", statusCode: 100 });
      }

      if (verifyPayment?.code === 101) {
        return res.json({ msg: "Payment already verified", statusCode: 101 });
      }

      return res.status(400).json({ msg: "Payment verification failed", code: verifyPayment?.code });

    } catch (error) {
      console.error("❌ Callback error:", error);
      return res.status(500).json({ msg: "Internal server error during payment verification" });
    }
  }
}

module.exports = new PaymentController();
