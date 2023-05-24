const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        refPath: "refModel",
        required: true,
    },
    price: Number,
    user: {
        type: Schema.Types.ObjectId,
        unique: true,
        ref: "user",
        required: true,
    },
    refModel: {
        type: String,
        enum: ["product", "entertainer"],
    },
});

const cartModel = model("cart", cartSchema);

module.exports = cartModel;
