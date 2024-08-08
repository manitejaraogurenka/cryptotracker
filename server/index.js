const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const helmet = require("helmet");
const cryptoRoutes = require("./routes/cryptoRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.use(express.json());

const PORT = process.env.PORT;

app.use(express.static("public"));

app.use("/", cryptoRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server connected to http://localhost:${PORT}`.yellow.bold);
});

module.exports = app;
