const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT ? process.env.PORT : 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
