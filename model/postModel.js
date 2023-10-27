const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    desc: { type: String, minLength: 10 },
    photos: [{ data: Buffer, contentType: String }],
    comments: [
        {
            user: { type: Schema.Types.ObjectId, ref: "user", required: true },
            data: String,
        },
    ],
});

const postModel = model("post", postSchema);

module.exports = postModel;
