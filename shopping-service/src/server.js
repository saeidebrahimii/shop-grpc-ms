const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const config = require("./config/config");
const path = require("path")
const productPackageDefinition = protoLoader.loadSync(
  "proto/product.proto",
  {}
);
const productProto = grpc.loadPackageDefinition(
  productPackageDefinition
).product;

const productClient = new productProto.ProductService(
  config.gRPC.product.url,
  grpc.credentials.createInsecure()
);

const authPackageDefinition = protoLoader.loadSync(path.join(__dirname,"/../proto/auth.proto"), {});
const authProto = grpc.loadPackageDefinition(authPackageDefinition).auth;

const authClient = new authProto.AuthService(
  config.gRPC.customer.url,
  grpc.credentials.createInsecure()
);
module.exports = { productClient, authClient };
