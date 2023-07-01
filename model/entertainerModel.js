const { Schema, model } = require("mongoose");

const entertainerSchema = new Schema({
    name: { type: String, minLength: 3, required: true },
    username: { type: String, minLength: 3, unique: true, required: true },
    religion: { type: String, minLength: 3, required: true },
    tribe: { type: Boolean, required: true },
    boobs: { type: String, default: "medium", required: true },
    category: { type: Schema.Types.ObjectId, ref: "category", required: true },
    availability: { type: Boolean, default: true },
    profile: { data: Buffer, contentType: String },
    photos: [{ data: Buffer, contentType: String }],
});

const entertainerModel = model("entertainer", entertainerSchema);

module.exports = entertainerModel;
