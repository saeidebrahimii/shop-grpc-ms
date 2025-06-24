const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const config = require("./config/config");
const ProductService = require("./services/product.service");

const PROTO_PATH = path.join(__dirname, "/../proto/product.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDef).product;

const service = new ProductService();
// تعریف متد gRPC
async function GetProduct(call, callback) {
  const productId = call.request.id;
  const product = await service.getProduct(productId);

  if (!product) {
    return callback({
      code: grpc.status.NOT_FOUND,
      message: "Product not found",
    });
  }

  callback(null, product);
}

// ساخت و راه‌اندازی سرور gRPC
const server = new grpc.Server();

server.addService(proto.ProductService.service, {
  GetProduct,
});

server.bindAsync(
  config.gRPC.url,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`🚀 gRPC Product Service running on port ${config.gRPC.port}`);
  }
);
