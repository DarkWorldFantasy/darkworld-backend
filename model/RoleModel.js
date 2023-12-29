const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
    name: { type: String, minLength: 2, unique: true, required: true },
});

const roleModel = model("role", roleSchema);

module.exports = roleModel;
