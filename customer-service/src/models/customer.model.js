const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    addresses: [
      {
        title: { type: String},
        street: { type: String },
        city: { type: String },
        province: { type: String },
        postal_code: { type: String },
        phone: { type: String },
        is_default: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
