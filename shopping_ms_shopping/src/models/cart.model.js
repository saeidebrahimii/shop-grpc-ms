const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    items: [
      {
        productId: mongoose.Types.ObjectId,
        qty: Number,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", cartSchema);
