const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const config = require("./config/config");
const ProductService = require("./services/product.service");

const PROTO_PATH = path.join(__dirname, "../proto/product.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDef).product;

const service = new ProductService();

async function GetProduct(call, callback) {
  try {
    const productId = call.request.id;
    const product = await service.getProduct(productId);

    if (!product) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Product not found",
      });
    }

    const result = {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      image: product.image,
      category: product.category,
      price: product.price,
      qty: product.qty,
    };

    callback(null, result);
  } catch (err) {
    console.error("gRPC GetProduct Error:", err);
    callback({
      code: grpc.status.INTERNAL,
      message: "Internal server error",
    });
  }
}

function startGrpcServer() {
  const server = new grpc.Server();

  server.addService(proto.ProductService.service, {
    GetProduct,
  });

  server.bindAsync(
    config.gRPC.url,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error("gRPC bind error:", err);
        return;
      }
      console.log(`🚀 gRPC Product Service running on port ${port}`);
    }
  );
}

startGrpcServer();
