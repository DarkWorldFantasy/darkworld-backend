const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    name: { type: String, minLength: 3, unique: true, required: true },
});

const categoryModel = model("category", categorySchema);

module.exports = categoryModel;
