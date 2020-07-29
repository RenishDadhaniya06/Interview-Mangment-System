const mongoose = require("mongoose");
require('dotenv/config')
mongoose
  .connect("mongodb://127.0.0.1:27017/user", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((data) => {
    console.log("Connected To Database");
  })
  .catch((error) => {
    console.log("error:", error);
  });
