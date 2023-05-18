const express = require("express");
const app = express();
const cors = require("cors");
const routerMiddleware = require("./middleware/router");

app.use(cors());
app.use(express.json());
routerMiddleware(app);

module.exports = app;
