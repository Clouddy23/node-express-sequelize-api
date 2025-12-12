require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();
const port = process.env.PORT;

const route = require("./routes/route");

app.get("/", route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
