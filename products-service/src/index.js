const express = require("express");
require("dotenv").config();
const config = require("./config/config");
const { indexRoutes } = require("./routes/index.routes");
const path = require("path");

const app = express();

require("./config/mongoose.config");

require("./server");

app.use(express.json())

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(indexRoutes);

app.use((req, res, next) => {
  res.status(404).json({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ msg: "Internal Server Error" });
});

app.listen(config.app.port, () => {
  console.log(`🟢 Product HTTP server running on port ${config.app.port}`);
});
