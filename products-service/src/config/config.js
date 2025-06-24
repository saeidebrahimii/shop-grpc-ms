module.exports = {
  database: {
    url: `${process.env.DB_URL}/${process.env.DB_NAME}`,
  },
  app: {
    port: process.env.PORT,
  },
  gRPC: {
    url: `${process.env.GRPC_DOMAIN}:${process.env.GRPC_PORT}`,
    port:process.env.GRPC_PORT
  },
};
