const express = require("express");
const categories = require("./routes/categories");

const app = express();
app.use(express.json());

app.use("/api/categories", categories);

const port = process.env.PORT ? process.env.PORT : 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
