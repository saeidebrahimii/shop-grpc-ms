module.exports = {
  database: {
    url: `${process.env.DB_URL}/${process.env.DB_NAME}`,
  },
  app: {
    port: process.env.PORT,
  },
  gRPC: {
    port:process.env.GRPC_PORT,
    url: `${process.env.GRPC_DOMAIN}:${process.env.GRPC_PORT}`,
    product: {
      url: process.env.GRPC_PRODUCT_URL,
    },
    cart: {
      url: process.env.GRPC_SHOPPING_URL,
    },
    customer: {
      url: process.env.GRPC_CUSTOMER_URL,
    },
    shopping: {
      url: process.env.GRPC_SHOPPING_URL,
    },
  },
  payment: {
    zarinpal: {
      url: process.env.ZARINPAL_BASE_URL,
    },
    currency: process.env.CURRENCY,
    merchantId: process.env.MERCHANT_ID,
    callbackUrl: process.env.CALLBACK_URL,
  },
};
