const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        unique: true,
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        refPath: "refModel",
        required: true,
    },
    refModel: {
        type: String,
        enum: ["product", "entertainer"],
    },
    price: { type: Number },
    done: { type: Boolean, default: false },
    time: { type: String, default: new Date().toLocaleString() },
});

const orderModel = model("order", orderSchema);

module.exports = orderModel;
