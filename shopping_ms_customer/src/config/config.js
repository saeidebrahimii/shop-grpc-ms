module.exports = {
  database: {
    url: `${process.env.DB_URL}/${process.env.DB_NAME}`,
  },
  app: {
    port: process.env.PORT,
    jwt:{
      access_secret_token:process.env.JWT_SECRET_ACCESS_TOKEN,
      refresh_secret_token:process.env.JWT_SECRET_REFRESH_TOKEN,
    }
  },
  gRPC: {
    url: `${process.env.GRPC_DOMAIN}:${process.env.GRPC_PORT}`,
    port:process.env.GRPC_PORT
  },
};
