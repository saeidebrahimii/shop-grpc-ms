const axios = require("axios").default;
const config = require("../config/config");

async function zarinpalPayment(
  merchant_id,
  amount,
  currency,
  description,
  callbackUrl,
  mobile = null,
  email = null,
  order_id = null
) {
  try {
    const data = {
      merchant_id,
      amount,
      callback_url: callbackUrl,
      description,
      currency,
      metadata: {},
    };

    if (mobile) data.metadata.mobile = mobile;
    if (email) data.metadata.email = email;
    if (order_id) data.order_id = order_id;

    const response = await axios.post(
      `${config.payment.zarinpal.url}/pg/v4/payment/request.json`,
      data,
      { proxy: false }
    );

    const result = response?.data?.data;
    const code = result?.code;
    const message = result?.message;

    if (code === 100 && message === "Success") {
      return result;
    }

    console.warn("🟠 Zarinpal Payment Error:", result);
    return false;
  } catch (error) {
    console.error("❌ Zarinpal Payment Exception:", error?.response?.data || error.message);
    return false;
  }
}

async function zarinpalPaymentVerify(merchant_id, amount, authority) {
  try {
    const data = {
      merchant_id,
      amount,
      authority,
    };

    const response = await axios.post(
      `${config.payment.zarinpal.url}/pg/v4/payment/verify.json`,
      data,
      { proxy: false }
    );

    const result = response?.data?.data;

    if (result) {
      return result;
    }

    console.warn("🟠 Zarinpal Verify Error:", response.data);
    return false;
  } catch (error) {
    console.error("❌ Zarinpal Verify Exception:", error?.response?.data || error.message);
    return false;
  }
}

module.exports = {
  zarinpalPayment,
  zarinpalPaymentVerify,
};
