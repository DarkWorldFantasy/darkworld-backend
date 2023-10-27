const { Schema, model } = require("mongoose");

const userProductInteractionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    productInteraction: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "entertainer",
                required: true,
            },
            orderCount: {
                type: Number,
                default: 1,
            },
        },
    ],
});

module.exports = model("userProductInteraction", userProductInteractionSchema);
