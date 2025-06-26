const path = require("path");
module.exports = {
  database: {
    url: `${process.env.DB_URL}/${process.env.DB_NAME}`,
  },
  app: {
    uploads: path.join(__dirname, "../../uploads"),
    port: process.env.PORT,
  },
  gRPC: {
    customer:{
      url:`${process.env.GRPC_CUSTOMER_DOMAIN}:${process.env.GRPC_CUSTOMER_PORT}`,
    },
    url: `${process.env.GRPC_DOMAIN}:${process.env.GRPC_PORT}`,
    port: process.env.GRPC_PORT,
  },
};
