const { Schema, model } = require("mongoose");

const providerSchema = new Schema({
    name: { type: String, minLength: 3, unique: true, required: true },
});

const providerModel = model("provider", providerSchema);

module.exports = providerModel;
