const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const config = require("./config/config");
const path = require("path")

//Cart
const cartPackageDefinition = protoLoader.loadSync(path.join(__dirname,"/../proto/cart.proto"), {});
const cartProto = grpc.loadPackageDefinition(cartPackageDefinition).cart;
const cartClient = new cartProto.CartService(
  config.gRPC.cart.url,
  grpc.credentials.createInsecure()
);


module.exports = { cartClient };
