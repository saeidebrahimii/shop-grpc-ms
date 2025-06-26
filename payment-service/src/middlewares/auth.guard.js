const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const config = require("../config/config");
const path = require("path");

const packageDef = protoLoader.loadSync(
  path.join(__dirname, "../../proto/auth.proto")
);
const proto = grpc.loadPackageDefinition(packageDef).auth;

const client = new proto.AuthService(
  config.gRPC.customer.url,
  grpc.credentials.createInsecure()
);

async function authGuard(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  client.ValidateToken({ token }, (err, response) => {
    if (err) {
      console.error("gRPC Error:", err);
      return res.status(500).json({ msg: "Auth service error" });
    }

    if (!response.valid) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    req.userId = response.userId;
    next();
  });
}

module.exports = { authGuard };
