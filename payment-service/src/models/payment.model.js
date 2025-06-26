const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    cartId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: false,
      default: "IRR",
    },
    status: {
      enum: ["pending", "success", "failed"],
    },
    gateway: {
      type: String,
      required: true,
    },
    gatewayRefId: {
      type: String,
      index: true,
      required: true,
    },
    errorMessage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Payment", paymentSchema);
