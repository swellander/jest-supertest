const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const { syncSeed } = require("./db");

module.exports = app;

app.use("/api", require("./router"));

const init = async () => {
  // await syncSeed();
  app.listen(port, () => console.log(`Listening on port ${port}`));
};

init();
