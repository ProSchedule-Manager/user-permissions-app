const express = require("express");
const bodyParser = require("body-parser");
const { syncDatabase } = require("./models");
const routes = require("./routes");

const app = express();
const PORT = 5433;

app.use(bodyParser.json());
app.use("/api", routes);

syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor está rodando na em http://localhost:${PORT}`);
  });
});
