const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const config = require("./config/config");
const path = require("path");
const { verifyJwtToken } = require("./utils/jwt.util");

const packageDef = protoLoader.loadSync(
  path.join(__dirname, "/../proto/auth.proto")
);
const proto = grpc.loadPackageDefinition(packageDef).auth;

const server = new grpc.Server();

async function validateToken(call, callback) {
  const token = call.request.token;
  if (!token) {
    return callback(null, { valid: false });
  }

  try {
    const decoded = await verifyJwtToken(token);
    return callback(null, {
      valid: true,
      userId: decoded.userId,
    });
  } catch (err) {
    return callback(null, { valid: false });
  }
}

server.addService(proto.AuthService.service, {
  ValidateToken: validateToken,
});

server.bindAsync(
  config.gRPC.url,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`🚀 gRPC Customer Service running on port ${config.gRPC.port}`);
  }
);
