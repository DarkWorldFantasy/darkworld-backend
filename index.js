const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
    .connect("mongodb+srv://dark-world:UjI4cLTckSBCxcXy@cluster0.hf59b0d.mongodb.net/dark-world")
    .then((result) => console.log("Connected."))
    .catch((err) => console.log(err));

app.listen(process.env.PORT, (req, res) => {
    console.log(`Listend to port no. ${process.env.PORT}`);
});
