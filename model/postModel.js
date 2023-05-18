const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    name: { type: Schema.Types.ObjectId, ref: "provider", required: true },
    desc: { type: String, minLength: 10, required: true },
    photos: [{ data: Buffer, contentType: String }],
});

const postModel = model("post", postSchema);

module.exports = postModel;
