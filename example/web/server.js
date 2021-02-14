const path = require("path");
const express = require("express");

const app = express();
app.use("/build", express.static(path.join(__dirname, "../../build")));
app.use(express.static(path.join(__dirname, "public")));
app.listen(3000, () => {
  console.log("Http server listening on port 3000...");
});
