const express = require("express");
const config = require("./config/config");
const { createProxyMiddleware } = require("http-proxy-middleware");
const morgan = require("morgan")
const app = express();
app.use(morgan("dev"))
app.use(
  "/customers",
  createProxyMiddleware({
    target: "http://localhost:8001",
  })
);
app.use(
  "/products",
  createProxyMiddleware({
    target: "http://localhost:8002",
  })
);
app.use(
  "/shop",
  createProxyMiddleware({
    target: "http://localhost:8003",
  })
);
app.use(
  "/payment",
  createProxyMiddleware({
    target: "http://localhost:8004",
  })
);
app.use((req, res, next) => {
  res.status(404).json({ msg: "route not found" });
});
app.listen(config.app.port, () => {
  console.log(`🟢 Application running on port ${config.app.port}`);
});
