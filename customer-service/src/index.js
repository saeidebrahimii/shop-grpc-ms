const express = require("express");
require("dotenv").config();
const config = require("./config/config");
const { indexRoutes } = require("./routes/index.routes");
require("./config/mongoose.config");

const app = express();
require("./server");

app.use(express.json());

app.use(indexRoutes);

app.use((req, res, next) => {
  res.status(404).json({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong!" });
});

app.listen(config.app.port, () => {
  console.log(`🟢 Customer server running on port ${config.app.port}`);
});
