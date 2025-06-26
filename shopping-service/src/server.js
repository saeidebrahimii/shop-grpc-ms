const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const config = require("./config/config");
const path = require("path");
const CartService = require("./services/cart.service");

// Load Product proto
const productPackageDefinition = protoLoader.loadSync("proto/product.proto", {});
const productProto = grpc.loadPackageDefinition(productPackageDefinition).product;
const productClient = new productProto.ProductService(
  config.gRPC.product.url,
  grpc.credentials.createInsecure()
);


// Load Cart proto
const cartPackageDefinition = protoLoader.loadSync(path.join(__dirname, "/../proto/cart.proto"), {});
const cartProto = grpc.loadPackageDefinition(cartPackageDefinition).cart;

const server = new grpc.Server();

async function getCart(call, callback) {
  try {
    const cart = await new CartService().getCartById(call.request.id);
    callback(null, cart ? {
      valid: true,
      id: cart._id.toString(),
      userId: cart.userId.toString(),
      status: cart.status,
    } : { valid: false });
  } catch {
    callback(null, { valid: false });
  }
}

async function lockedCart(call, callback) {
  try {
    const status = await new CartService().lockedCartById(call.request.id);
    callback(null, { status });
  } catch {
    callback(null, { status: false });
  }
}

async function paidCart(call, callback) {
  try {
    const status = await new CartService().paidCartById(call.request.id);
    callback(null, { status });
  } catch {
    callback(null, { status: false });
  }
}

server.addService(cartProto.CartService.service, {
  GetCart: getCart,
  LockedCart: lockedCart,
  PaidCart: paidCart,
});

server.bindAsync(config.gRPC.url, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`🚀 gRPC Shopping Service running on port ${config.gRPC.port}`);
});

module.exports = { productClient };
