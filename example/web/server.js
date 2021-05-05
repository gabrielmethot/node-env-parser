const path = require("path");
const express = require("express");

express()
  .use("/build", express.static(path.join(__dirname, "../../build/esm"), { extensions: ["html", "js"] }))
  .use(express.static(path.join(__dirname, "public")))
  .listen(3000, () => {
    console.log("Http server listening on port 3000...");
  });
