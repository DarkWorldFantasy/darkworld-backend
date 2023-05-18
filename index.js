const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
    .connect(process.env.LOCAL_DB)
    .then((result) => console.log("Connected."))
    .catch((err) => console.log(err));

app.listen(process.env.PORT, (req, res) => {
    console.log(`Listend to port no. ${process.env.PORT}`);
});
