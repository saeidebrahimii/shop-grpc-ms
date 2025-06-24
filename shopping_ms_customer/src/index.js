const express = require("express");
require("dotenv").config();
const config = require("./config/config");
const { indexRoutes } = require("./routes/index.routes");
const bodyParser = require("body-parser");
require("./config/mongoose.config");
const app = express();
require("./server")

app.use(bodyParser.json());

app.use(indexRoutes);

app.use((req, res, next) => {
  res.status(404).json({ msg: "route not found" });
});

app.listen(config.app.port, () => {
  console.log(`🟢 Customer server running on port ${config.app.port}`);
});
