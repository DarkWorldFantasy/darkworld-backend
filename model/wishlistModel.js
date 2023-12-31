const { Schema, model } = require("mongoose");

const wishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "entertainer",
        required: true,
    },
});

const wishlistModel = model("wishlist", wishlistSchema);

module.exports = wishlistModel;
