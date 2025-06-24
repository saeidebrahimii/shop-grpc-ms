const express = require("express");
require("dotenv").config();
const config = require("./config/config");
const bodyParser = require("body-parser");
const { indexRoutes } = require("./routers/index.routes");
const app = express();
require("./config/mongoose.config");
require("./server");
app.use(bodyParser.json());

app.use(indexRoutes);

app.use((req, res, next) => {
  res.status(404).json({ msg: "route not found" });
});

app.listen(config.app.port, () => {
  console.log(`🟢 Product server running on port ${config.app.port}`);
});
