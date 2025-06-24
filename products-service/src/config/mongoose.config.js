const mongoose = require("mongoose");
const config = require("./config");
mongoose.connect(config.database.url).catch((err) => {
  console.log("❌DB ERROR: ", err);
});
